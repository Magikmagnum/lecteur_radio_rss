<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class AuthControllerTest extends WebTestCase
{
    private $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testAccessPage(): void
    {
        $client = $this->client;
        $client->request('GET', '/');
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    public function testContenuTitre(): void
    {
        $client = $this->client;
        $client->request('GET', '/');
        $this->assertSelectorTextContains('h1', 'Bienvenue sur la Radio Bousole');
    }

    public function testPageRadioRestictionAccess(): void
    {
        $client = $this->client;
        $client->request('GET', '/radio');
        $this->assertResponseStatusCodeSame(Response::HTTP_FOUND);
    }

    public function testPageRadioRestictionAccessEtRedirectAuLogin(): void
    {
        $client = $this->client;
        $client->request('GET', '/radio');
        $this->assertResponseRedirects('/login');
    }
}
