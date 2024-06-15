<?php

namespace App\Tests\Controller;

use App\DataFixtures\UserRoleFixtures;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Liip\TestFixturesBundle\Services\DatabaseToolCollection;

class SecurityControllerTest extends WebTestCase
{
    private $client;
    private $databaseTool;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->databaseTool = self::getContainer()->get(DatabaseToolCollection::class)->get();
    }

    public function testLogin_restictionAccess_et_redirectLogin(): void
    {
        $this->client->request('GET', '/login');
        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $this->assertSelectorNotExists('.alert.alert-danger');
    }

    public function testLogin_withBadCredential(): void
    {
        $crawler = $this->client->request('GET', '/login');
        $form = $crawler->selectButton('Se connecter')->form([
            'email' => 'test@example.com',
            'password' => 'fakepassword'
        ]);

        $this->client->submit($form);

        // Vérifie que la réponse est bien une redirection vers /login (page de login)
        $this->assertResponseRedirects('/login');
        // Suit la redirection pour afficher la page de login avec l'alerte d'erreur
        $crawler = $this->client->followRedirect();
        // Vérifie que l'alerte d'erreur est affichée
        $this->assertSelectorExists('.alert.alert-danger');
    }

    public function testLogin_withGodCredential(): void
    {
        $this->databaseTool->loadFixtures([UserRoleFixtures::class]);

        // Make the GET request to /login
        $crawler = $this->client->request('GET', '/login');

        // Check that the form is present
        $this->assertSelectorExists('form');

        // Select the form and fill in the credentials
        $form = $crawler->selectButton('Se connecter')->form([
            'email' => 'user@example.com', // Correspond to the 'name' attribute in the form
            'password' => '1Passw@rd'     // Correspond to the 'name' attribute in the form
        ]);

        // Submit the form
        $this->client->submit($form);

        // Assert that the response redirects to /radio
        $this->assertResponseRedirects('/radio');
    }


    public function testLogin_withGodCredential_andRedirectTotargetPath(): void
    {
        $this->databaseTool->loadFixtures([UserRoleFixtures::class]);

        // Make the GET request to /login
        $crawler = $this->client->request('GET', '/radio');
        $this->assertResponseRedirects('/login');

        $crawler = $this->client->followRedirect();

        // Check that the form is present
        $this->assertSelectorExists('form');

        // Select the form and fill in the credentials
        $form = $crawler->selectButton('Se connecter')->form([
            'email' => 'user@example.com', // Correspond to the 'name' attribute in the form
            'password' => '1Passw@rd'     // Correspond to the 'name' attribute in the form
        ]);

        // Submit the form
        $this->client->submit($form);

        // Assert that the response redirects to /radio
        $this->assertResponseRedirects('/radio');
    }


    protected function tearDown(): void
    {
        parent::tearDown();
        // Clean up the test environment
        $this->client = null;
    }
}
