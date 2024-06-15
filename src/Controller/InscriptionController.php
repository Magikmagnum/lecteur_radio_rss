<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class InscriptionController extends AbstractController
{
    #[Route('/', name: 'homepage')]
    public function index(Request $request): Response
    {
        $nom = $request->request->get('nom');
        return $this->render('inscription/index.html.twig', [
            'nom' => $nom,
        ]);
    }

    #[Route('/radio', name: 'radio_page')]
    #[IsGranted('ROLE_USER')]
    public function radio(): Response
    {
        return $this->render('radio.html.twig');
    }
}