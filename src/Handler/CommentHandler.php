<?php

declare(strict_types=1);

namespace App\Handler;

use App\Message\CommentCreateMessage;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

final readonly class CommentHandler
{
    public function __construct(
        private LoggerInterface $logger,
        private EntityManagerInterface $entityManager,
    ) {
    }

    #[AsMessageHandler]
    public function commentCreate(CommentCreateMessage $event): void
    {
        $comment = $event->getComment();

        // $this->entityManager->persist($comment);
        // $this->entityManager->flush();

        $this->logger->notice('Comment created');
    }
}
