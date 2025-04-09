<?php

declare(strict_types=1);

namespace App\Message;

use App\Entity\Comment;
use App\Entity\Post;

final class CommentCreateMessage
{
    public function __construct(
        protected Post $post,
        protected Comment $comment,
    ) {
    }

    public function getComment(): Comment
    {
        return $this->comment;
    }
}
