<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240701152144 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE avis (id INT AUTO_INCREMENT NOT NULL, is_aime TINYINT(1) DEFAULT NULL, commentaire VARCHAR(255) DEFAULT NULL, user_id INT NOT NULL, emission_id INT NOT NULL, INDEX IDX_8F91ABF0A76ED395 (user_id), INDEX IDX_8F91ABF017E24D70 (emission_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE emission (id INT AUTO_INCREMENT NOT NULL, color VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, position_dans_leplaylist INT NOT NULL, playlist_id INT NOT NULL, INDEX IDX_F0225CF46BBD148 (playlist_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE avis ADD CONSTRAINT FK_8F91ABF017E24D70 FOREIGN KEY (emission_id) REFERENCES emission (id)');
        $this->addSql('ALTER TABLE emission ADD CONSTRAINT FK_F0225CF46BBD148 FOREIGN KEY (playlist_id) REFERENCES playlist (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_IDENTFIER_PLAYLIST ON playlist (url)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF0A76ED395');
        $this->addSql('ALTER TABLE avis DROP FOREIGN KEY FK_8F91ABF017E24D70');
        $this->addSql('ALTER TABLE emission DROP FOREIGN KEY FK_F0225CF46BBD148');
        $this->addSql('DROP TABLE avis');
        $this->addSql('DROP TABLE emission');
        $this->addSql('DROP INDEX UNIQ_IDENTFIER_PLAYLIST ON playlist');
    }
}
