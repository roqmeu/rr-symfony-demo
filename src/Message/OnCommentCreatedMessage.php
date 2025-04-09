<?php

declare(strict_types=1);

namespace App\Message;

use App\Entity\Comment;

final class OnCommentCreatedMessage
{
    public function __construct(
        protected Comment $comment,
    ) {
    }

    public function getComment(): Comment
    {
        return $this->comment;
    }
}
