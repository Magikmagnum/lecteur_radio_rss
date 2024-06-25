<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\FluxRepository;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: FluxRepository::class)]
#[ORM\UniqueConstraint(name: 'UNIQ_IDENTIFIER_FLUX', fields: ['url'])]
class Flux
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]

    #[Assert\Regex(
        pattern: "/^(https?|ftp):\/\/(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(?<!-)(:[0-9]{1,5})?(\/[A-Za-z0-9\-._~:\/?#\[\]@!$&'()*+,;=]*)?$/",
        message: "The URL '{{ value }}' is not a valid URL."
    )]
    private ?string $url = null;

    #[ORM\ManyToOne]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}