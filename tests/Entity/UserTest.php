<?php

namespace App\Tests\Entity;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class UserTest extends KernelTestCase
{
    private EntityManagerInterface $entityManager;
    private ValidatorInterface $validator;

    protected function setUp(): void
    {
        parent::setUp();
        self::bootKernel();
        $this->entityManager = self::getContainer()->get(EntityManagerInterface::class);
        $this->validator = self::getContainer()->get(ValidatorInterface::class);
    }

    /**
     * Helper method to create a User entity with default valid data.
     *
     * @return User
     */
    private function getEntity(): User
    {
        $user = new User();
        $user->setEmail('test@example.com');
        $user->setPassword("1ericTest#<>");
        return $user;
    }

    /**
     * Test for a valid User entity.
     */
    public function testValidEntity(): void
    {
        $this->assertAsError($this->getEntity(), 0);
    }

    /**
     * Test for an invalid User entity with email missing "@".
     */
    public function testInvalidMailEntityWithoutAt(): void
    {
        // Without "@" symbol
        $entity = $this->getEntity()->setEmail('testexample.com');
        $this->assertAsError($entity, 1);
    }

    /**
     * Test for an valid User entity with email and subdomain.
     */
    public function testValidEmailWithSubdomain(): void
    {
        // Valid email with subdomain
        $entity = $this->getEntity()->setEmail('test@sub.example.com');
        $this->assertAsError($entity, 0); // Expecting 0 errors
    }

    /**
     * Test for an invalid User entity with email missing ".".
     */
    public function testInvalidEMailEntityWithoutDot(): void
    {
        // Without "." symbol
        $entity = $this->getEntity()->setEmail('test@examplecom');
        $this->assertAsError($entity, 1);
    }

    /**
     * Test for an invalid User entity with empty password.
     */
    public function testInvalidPasswordNotEmptyEntity(): void
    {
        $entity = $this->getEntity()->setPassword('');
        $this->assertAsError($entity, 2); // Expecting 2 errors (password should not be blank and should contain at least 8 characters)
    }

    /**
     * Test for an invalid User entity with password length less than 8 characters.
     */
    public function testPasswordLengthMinimumRequirement(): void
    {
        $entity = $this->getEntity()->setPassword('1aaWa1}');
        $this->assertAsError($entity, 1); // Expecting 1 error (password must be at least 8 characters long)
    }

    /**
     * Test for an invalid User entity with password missing a capital letter.
     */
    public function testPasswordRequiresCapitalLetter(): void
    {
        $entity = $this->getEntity()->setPassword('1jes@iscode1');
        $this->assertAsError($entity, 1); // Expecting 1 error (password must contain at least one uppercase letter)
    }

    /**
     * Test for an invalid User entity with password missing a special character.
     */
    public function testPasswordRequiresSpecialChar(): void
    {
        $entity = $this->getEntity()->setPassword('1jesMiscode1');
        $this->assertAsError($entity, 1); // Expecting 1 error (password must contain at least one special character)
    }

    /**
     * Helper method to validate an entity and assert the number of errors.
     *
     * @param mixed $entity The entity object to validate.
     * @param int $expectedNumberOfErrors The expected number of validation errors.
     */
    private function assertAsError($entity, $expectedNumberOfErrors): void
    {
        self::bootKernel();
        $errors = $this->validator->validate($entity);

        $messages = [];
        foreach ($errors as $error) {
            $messages[] = $error->getPropertyPath() . " => " . $error->getMessage();
        }
        $this->assertCount($expectedNumberOfErrors, $errors, implode(', ', $messages));
    }

    public function testUniqueEmailConstraint(): void
    {
        $entityManager = $this->entityManager;
        $validator = $this->validator;

        // Create and persist the first user
        $firstUser = $this->getEntity()->setEmail('testex1@ample.com');
        $entityManager->persist($firstUser);
        $entityManager->flush();
        try {
            // Attempt to create a duplicate user with the same email
            $duplicateUser = $this->getEntity()->setEmail('testex1@ample.com')->setPassword('1ano3therPass?wo@rd');
            $entityManager->persist($duplicateUser);
            $entityManager->flush();
        } catch (UniqueConstraintViolationException $exception) {
            $this->assertInstanceOf(UniqueConstraintViolationException::class, $exception);
        }
    }
}