<?php

namespace App\Tests\Entity;

use App\Entity\Playlist;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;

class PlaylistTest extends KernelTestCase
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

    public function testValidEntity(): void
    {
        $this->assertAsError($this->getEntity(), 0);
    }

    /**
     * Test for an invalid User entity with email missing "@".
     */
    public function testInvalidMailEntityWithoutAt(): void
    {
        $invalidUrlProvider = [
            "http://example..com",
            "http://.com",
            "http://example..com",
            "http//:example.com",
            "://example.com",
            "http:// example.com",
            "http:/example.com",
            "http://-example.com",
            "http://example.com:-80",
            "http://example.com:abc",
            "http://example,com",
            "http://example_com",
        ];

        foreach ($invalidUrlProvider as $key => $invalidUrl) {
            $entity = $this->getEntity()->setUrl($invalidUrl);
            $this->assertAsError($entity, 1);
        }
    }

    public function testUniqueConstraint(): void
    {
        $entityManager = $this->entityManager;

        $user = new User();
        $user->setEmail('test1234@example.com');
        $user->setPassword('1ano3therPass?wo@rd');
        $entityManager->persist($user);
        $entityManager->flush();

        $url = "http://exampleTestUnique.com";

        // Create and persist the first Playlist entity
        $firstPlaylist = $this->getEntity()->setUrl($url)->setUser($user);

        $entityManager->persist($firstPlaylist);
        $entityManager->flush();
        try {
            // Attempt to create a second Playlist entity with the same URL
            $duplicatePlaylist = $this->getEntity()->setUrl($url)->setUser($user);
            $entityManager->persist($duplicatePlaylist);
            $entityManager->flush();
        } catch (UniqueConstraintViolationException $exception) {
            $this->assertInstanceOf(UniqueConstraintViolationException::class, $exception);
        }
    }


    /**
     * Helper method to create a Playlist entity with default valid data.
     *
     * @return Playlist
     */
    private function getEntity(): Playlist
    {
        $user = $this->createMock(User::class);
        $user->method('getId')->willReturn(1);
        $user->method('getEmail')->willReturn('test@example.com');
        $user->method('getPassword')->willReturn('1ericTest#<>');


        $playlist = new Playlist();
        $playlist->setUrl('http://example.com');
        $playlist->setUser($user);
        return $playlist;
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
}