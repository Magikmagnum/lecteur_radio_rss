<?php

namespace App\Tests\Behat;

use Behat\Behat\Context\Context;
use Behat\MinkExtension\Context\MinkContext;
use App\Service\CompteService;
use App\Service\VirementStatus;
use App\Service\CompteStatus;
use PHPUnit\Framework\Assert;

enum VirementContextStatus: string
{
    case COMPTE_ERROR_INITIALISATION = "Les comptes n'ont pas été initialisés correctement.";
}

class VirementContext extends MinkContext implements Context
{
    private $compteCourant;
    private $compteEpargne;
    private $virementStatus;

    public function __construct()
    {
        $this->compteCourant = null;
        $this->compteEpargne = null;
        $this->virementStatus = null;
    }

    /**
     * @Given j'ai un compte courant avec un solde de :soldeCourant$
     */
    public function jaiUnCompteCourantAvecUnSoldeDe($soldeCourant)
    {
        $this->compteCourant = new CompteService(CompteStatus::COURANT, (float) $soldeCourant);
    }

    /**
     * @Given j'ai un compte épargne avec un solde de :soldeEpargne$
     */
    public function jaiUnCompteEpargneAvecUnSoldeDe($soldeEpargne)
    {
        $this->compteEpargne = new CompteService(CompteStatus::EPARGNE, (float) $soldeEpargne);
    }

    /**
     * @When je fais un virement d'un montant de :montant$ du compte courant vers le compte épargne
     */
    public function jeFaisUnVirementDunMontantDeDuCompteCourantVersLeCompteEpargne($montant)
    {
        if ($this->compteCourant && $this->compteEpargne) {
            $this->virementStatus = $this->compteCourant->faireUnVirement((float) $montant, $this->compteEpargne);
        } else {
            throw new \Exception("Les comptes n'ont pas été initialisés correctement.");
        }
    }

    /**
     * @Then le compte épargne a un solde de :soldeEpargneAttendu$
     */
    public function leCompteEpargneAUnSoldeDe($soldeEpargneAttendu)
    {
        Assert::assertEquals(
            (float) $soldeEpargneAttendu,
            $this->compteEpargne?->getSolde(),
            "Le solde du compte épargne ne correspond pas. Attendu : " . (float) $soldeEpargneAttendu . ", Actuel : " . $this->compteEpargne?->getSolde()
        );
    }

    /**
     * @Then le compte courant a un solde de :soldeCourantAttendu$
     */
    public function leCompteCourantAUnSoldeDe($soldeCourantAttendu)
    {
        Assert::assertEquals(
            (float) $soldeCourantAttendu,
            $this->compteCourant?->getSolde(),
            "Le solde du compte courant ne correspond pas. Attendu : " . (float) $soldeCourantAttendu . ", Actuel : " . $this->compteCourant?->getSolde()
        );
    }

    /**
     * @Then le virement a été confirmé
     */
    public function leVirementAEteConfirme()
    {
        Assert::assertEquals(
            VirementStatus::CONFIRME,
            $this->virementStatus,
            "Le virement n'a pas été confirmé."
        );
    }

    /**
     * @Then le virement est refusé pour solde insuffisant
     */
    public function leVirementEstRefusePourSoldeInsuffisant()
    {
        Assert::assertEquals(
            VirementStatus::REFUSE_SOLDE_INSUFFISANT,
            $this->virementStatus,
            "Le virement n'a pas été refusé pour solde insuffisant."
        );
    }
}