<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class EmissionController extends AbstractController
{
    #[Route('/emission', name: 'app_emission')]
    public function index(): Response
    {
        return $this->render('emission/index.html.twig', [
            'controller_name' => 'EmissionController',
        ]);
    }
}
