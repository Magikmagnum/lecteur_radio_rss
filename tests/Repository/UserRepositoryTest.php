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
        $userCount = $this->entityManager->getRepository(User::class)->count([]);
        $this->assertEquals(10, $userCount); // Exemple, remplacer 10 par le nombre attendu d'utilisateurs dans les fixtures
    }

    protected function tearDown(): void
    {
        parent::tearDown();
        // Evite les fuites de mémoire
        $this->entityManager->close();
        $this->entityManager = null;
    }




    // public function testSomething(): void
    // {
    //     $kernel = self::bootKernel();

    //     $this->assertSame('test', $kernel->getEnvironment());
    //     // $routerService = static::getContainer()->get('router');
    //     // $myCustomService = static::getContainer()->get(CustomService::class);
    // }
}
