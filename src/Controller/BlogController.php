<?php

declare(strict_types=1);

namespace App\Controller;

use App\Entity\Comment;
use App\Entity\Post;
use App\Message\CommentCreateMessage;
use Psr\Log\LoggerInterface;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/blog')]
final class BlogController extends AbstractController
{
    public function __construct(
        private readonly MessageBusInterface $messageBus,
        private readonly SerializerInterface $serializer,
        private readonly LoggerInterface $logger,
    ) {
    }

    #[Route('/ok', name: 'blog_ok', methods: ['GET'])]
    public function ok(): Response
    {
        $this->logger->notice('Received blog_ok request');

        return new JsonResponse(
            null,
            Response::HTTP_OK,
        );
    }

    #[Route('/comment/{commentId}', name: 'blog_comment', requirements: ['commentId' => Requirement::POSITIVE_INT], methods: ['GET'])]
    public function comment(
        #[MapEntity(id: 'commentId')] Comment $comment,
    ): Response {
        $this->logger->notice('Received blog_comment request');

        return new JsonResponse(
            $this->serializer->serialize($comment, 'json', ['groups' => 'comment:item']),
            Response::HTTP_OK,
            [],
            true
        );
    }

    #[Route('/post/{postId}/comment', name: 'blog_comment_new', requirements: ['postId' => Requirement::POSITIVE_INT], methods: ['POST'])]
    public function commentNew(
        #[MapEntity(id: 'postId')] Post $post,
        #[MapRequestPayload(validationGroups: ['comment:new'])] Comment $comment,
    ): Response {
        $this->logger->notice('Received blog_comment_new request');

        $this->messageBus->dispatch(new CommentCreateMessage($post, $comment));

        $this->logger->notice('CommentCreateMessage dispatched');

        return new JsonResponse(
            null,
            Response::HTTP_OK,
        );
    }
}
