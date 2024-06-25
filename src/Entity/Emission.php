<?php

namespace App\Entity;

use App\Repository\EmissionRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: EmissionRepository::class)]
class Emission
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column]
    private ?int $positionDansLeflux = null;

    #[ORM\ManyToOne(inversedBy: 'emissions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Flux $flux = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getPositionDansLeflux(): ?int
    {
        return $this->positionDansLeflux;
    }

    public function setPositionDansLeflux(int $positionDansLeflux): static
    {
        $this->positionDansLeflux = $positionDansLeflux;

        return $this;
    }

    public function getFlux(): ?Flux
    {
        return $this->flux;
    }

    public function setFlux(?Flux $flux): static
    {
        $this->flux = $flux;

        return $this;
    }
}
