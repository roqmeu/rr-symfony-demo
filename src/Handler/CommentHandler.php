<?php

declare(strict_types=1);

namespace App\Handler;

use App\Message\CommentCreateMessage;
use App\Message\OnCommentCreatedMessage;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;
use Symfony\Component\Messenger\MessageBusInterface;

final readonly class CommentHandler
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private MessageBusInterface $messageBus,
    ) {
    }

    #[AsMessageHandler]
    public function commentCreate(CommentCreateMessage $event): void
    {
        $comment = $event->getComment();

        $this->entityManager->persist($comment);
        $this->entityManager->flush();

        $this->messageBus->dispatch(new OnCommentCreatedMessage($comment));
    }

    #[AsMessageHandler]
    public function onCommentCreated(OnCommentCreatedMessage $event): void
    {
    }
}
