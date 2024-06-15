<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;

class UserRoleFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $user = new User();
        $user->setEmail('user@example.com');
        $user->setPassword('$2y$10$jDmnZkHOXeLX5zEorN6VSu0pcfO64RCV9hX50C/iysxIpFXNb01MK');
        $manager->persist($user);
        $manager->flush();
    }
}