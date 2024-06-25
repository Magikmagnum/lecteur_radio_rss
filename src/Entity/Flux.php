<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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

    /**
     * @var Collection<int, Emission>
     */
    #[ORM\OneToMany(targetEntity: Emission::class, mappedBy: 'flux', orphanRemoval: true)]
    private Collection $emissions;

    public function __construct()
    {
        $this->emissions = new ArrayCollection();
    }

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

    /**
     * @return Collection<int, Emission>
     */
    public function getEmissions(): Collection
    {
        return $this->emissions;
    }

    public function addEmission(Emission $emission): static
    {
        if (!$this->emissions->contains($emission)) {
            $this->emissions->add($emission);
            $emission->setFlux($this);
        }

        return $this;
    }

    public function removeEmission(Emission $emission): static
    {
        if ($this->emissions->removeElement($emission)) {
            // set the owning side to null (unless already changed)
            if ($emission->getFlux() === $this) {
                $emission->setFlux(null);
            }
        }

        return $this;
    }
}