<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class AuthControllerTest extends WebTestCase
{
    public function testAccessPage(): void
    {
        $client = static::createClient();
        $client->request('GET', '/');
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    public function testContenuTitre(): void
    {
        $client = static::createClient();
        $client->request('GET', '/');
        $this->assertSelectorTextContains('h1', 'Bienvenue sur la Radio Bousole');
    }

    public function testPageRadioRestictionAccess(): void
    {
        $client = static::createClient();
        $client->request('GET', '/radio');
        $this->assertResponseStatusCodeSame(Response::HTTP_FOUND);
    }

    public function testPageRadioRestictionAccessEtRedirectAuLogin(): void
    {
        $client = static::createClient();
        $client->request('GET', '/radio');
        $this->assertResponseRedirects('/login');
    }
}