<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class UserFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setEmail("user$i@domaine.com");
            $user->setPassword("0000");
            $manager->persist($user);

            if ($i === 3) {
                $user->setRoles(["ROLE_ADMIN"]);
            }
        }
        $manager->flush();
    }
}