<?php

namespace App\Entity;

use App\Repository\PlaylistRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PlaylistRepository::class)]
#[ORM\UniqueConstraint(name: "UNIQ_IDENTFIER_PLAYLIST", fields: ["url"])]
class Playlist
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\Regex(
        pattern: "/^(https?|ftp):\/\/(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(?<!-)(:[0-9]{1,5})?(\/[A-Za-z0-9\-._~:\/?#\[\]@!$&'()*+,;=]*)?$/",
        message: "The URL {{ value }} is not valide "
    )]
    #[ORM\Column(length: 255)]
    private ?string $url = null;

    #[ORM\Column(nullable: true)]
    private ?bool $isVisible = null;

    #[ORM\ManyToOne]
    private ?User $user = null;

    /**
     * @var Collection<int, Emission>
     */
    #[ORM\OneToMany(targetEntity: Emission::class, mappedBy: 'playlist', orphanRemoval: true)]
    private Collection $emission;

    public function __construct()
    {
        $this->emission = new ArrayCollection();
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

    public function isVisible(): ?bool
    {
        return $this->isVisible;
    }

    public function setVisible(?bool $isVisible): static
    {
        $this->isVisible = $isVisible;

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
    public function getEmission(): Collection
    {
        return $this->emission;
    }

    public function addEmission(Emission $emission): static
    {
        if (!$this->emission->contains($emission)) {
            $this->emission->add($emission);
            $emission->setPlaylist($this);
        }

        return $this;
    }

    public function removeEmission(Emission $emission): static
    {
        if ($this->emission->removeElement($emission)) {
            // set the owning side to null (unless already changed)
            if ($emission->getPlaylist() === $this) {
                $emission->setPlaylist(null);
            }
        }

        return $this;
    }
}