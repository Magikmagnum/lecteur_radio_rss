<?php

namespace App\Tests\Behat;

use Behat\Behat\Tester\Exception\PendingException;
use Behat\Behat\Context\Context;
use Behat\MinkExtension\Context\MinkContext;

class InscriptionContext extends MinkContext implements Context
{

    /**
     * @When je vais sur la page d'accueil
     */
    public function jeVaisSurLaPageDaccueil()
    {
        $this->visit('/');
    }

    /**
     * @When je remplis :field avec :value
     */
    public function jeRemplisAvec($field, $value)
    {
        $this->fillField($field, $value);
    }

    /**
     * @When je clique sur le bouton :button
     */
    public function jeCliqueSurLeBouton($button)
    {
        $this->pressButton($button);
    }

    /**
     * @Then je devrais voir :text
     */
    public function jeDevraisVoir($text)
    {
        $this->assertPageContainsText($text);
    }
}
