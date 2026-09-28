"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import type { MicroCmsPost } from "../../_types/MicroCmsPost";
import Image from "next/image";

function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [loading, setLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `https://gmai54xndr.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
            .NEXT_PUBLIC_MICRO_CMS_API_KEY as string,
          },
        },
      );
      const data = await res.json();
      setPost(data);
      setLoading(false);
    };

    fetcher();
  }, []);

  if (loading) {
    return <p className="py-6 px-4 text-xl">読み込み中</p>;
  }

  if (!post) {
    return <p className="py-6 px-4 text-xl">記事が見つかりませんでした</p>;
  }

  return (
    <div className="py-6 px-4">
      <Image
        src={post.thumbnail.url}
        width={800}
        height={400}
        alt={`${post.title}の画像`}
        className="w-[400px] h-auto mx-auto"
      />
      <div>
        <div className="flex items-center gap-3 py-4">
          <p className="text-gray-500 text-xl">
            {new Date(post.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          {post.categories.map((c) => (
            <span
              key={c.id}
              className="bg-gray-100 text-gray-600 text-base px-3 py-1 rounded-full"
            >
              {c.name}
            </span>
          ))}
        </div>
        <h1 className="font-bold text-3xl mb-4">{post.title}</h1>
        <div
          className=" text-gray-600 text-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <Link href="/">
        <h2 className="text-xl py-12">記事一覧へ戻る</h2>
      </Link>
    </div>
  );
}

export default PostDetail;
