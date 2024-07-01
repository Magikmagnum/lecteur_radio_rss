<?php

namespace App\Service;

enum VirementStatus: string
{
    case CONFIRME = 'le virement a été confirmé';
    case REFUSE_SOLDE_INSUFFISANT = 'le virement est refusé pour solde insuffisant';
}

enum CompteStatus: string
{
    case COURANT = 'compte courant';
    case EPARGNE = 'compte épargne';
}


class CompteService
{
    private CompteStatus $status;
    private float $solde;

    public function __construct(CompteStatus $status, float $solde)
    {
        $this->status = $status;
        $this->solde = $solde;
    }

    public function getSolde(): float
    {
        return $this->solde;
    }

    // public function getStatus(): CompteStatus
    // {
    //     return $this->status;
    // }

    public function retirer(float $montant): bool
    {
        if ($this->solde >= $montant) {
            $this->solde -= $montant;
            return true;
        }
        return false;
    }

    public function ajouter(float $montant): void
    {
        $this->solde += $montant;
    }

    public function faireUnVirement(float $montant, CompteService $compteCible): VirementStatus
    {
        if ($this->retirer($montant)) {
            $compteCible->ajouter($montant);
            return VirementStatus::CONFIRME;
        }
        return VirementStatus::REFUSE_SOLDE_INSUFFISANT;
    }
}