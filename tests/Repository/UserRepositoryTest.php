<?php

namespace App\Tests\Repository;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\DataFixtures\UserFixtures;
use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Liip\TestFixturesBundle\Services\DatabaseToolCollection;
use Liip\TestFixturesBundle\Services\DatabaseTools\AbstractDatabaseTool;

class UserRepositoryTest extends KernelTestCase
{
    /**
     * @var AbstractDatabaseTool
     */
    protected $databaseTool;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    protected function setUp(): void
    {
        self::bootKernel();
        $this->databaseTool = self::getContainer()->get(DatabaseToolCollection::class)->get();
        $this->entityManager = self::getContainer()->get(EntityManagerInterface::class);
    }

    public function testCount(): void
    {
        $this->databaseTool->loadFixtures([UserFixtures::class]);
        $userRepository = $this->entityManager->getRepository(User::class);


        $users = $userRepository->findAll();
        $userTest = $users[3];

        $this->assertEquals(4, $userTest->getId());
        $this->assertEquals("user3@domaine.com", $userTest->getEmail());
        $this->assertEquals("user3@domaine.com", $userTest->getUserIdentifier());
        $this->assertEquals(["ROLE_ADMIN", "ROLE_USER"], $userTest->getRoles());
        $this->assertEquals("0000", $userTest->getPassword());

        $userCount = $userRepository->count([]);
        $this->assertEquals(10, $userCount); // Exemple, remplacer 10 par le nombre attendu d'utilisateurs dans les fixtures
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        // Evite les fuites de mémoire
        $this->entityManager->close();
        $this->entityManager = null;
    }
}