Feature: Epargne, faire des économies
En tant que Client de la banque
Je veux pouvoir faire un virement du compte courant vers un compte épargne
Afin d'épargner

Scenario Outline: Un virement est un montant qui va d'un compte source vers un compte destination
Given j'ai un compte courant avec un solde de <soldecourant>$
    And j'ai un compte épargne avec un solde de <soldeEpargne>$
        When je fais un virement d'un montant de <montant>$ du compte courant vers le compte épargne
            Then le compte épargne a un solde de <soldeEpargneAttendu>$
                And le compte courant a un solde de <soldeCourantAttendu>$
                    And le virement a été confirmé
                    Examples:
                    | soldecourant | soldeEpargne | montant | soldeCourantAttendu | soldeEpargneAttendu |
                    | 1000 | 100 | 200 | 800 | 300 |
                    | 400 | 1000 | 200 | 200 | 1200 |

                    Scenario: Si j'ai un solde inférieur au montant sur le compte source alors je suis averti par un
                    message solde insuffisant
                    Given j'ai un compte courant avec un solde de 200$
                    And j'ai un compte épargne avec un solde de 5000$
                    When je fais un virement d'un montant de 201$ du compte courant vers le compte épargne
                    Then le virement est refusé pour solde insuffisant
                    And le compte épargne a un solde de 5000$
                    And le compte courant a un solde de 200$