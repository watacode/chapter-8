"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import type { MicroCmsPost } from "./_types/MicroCmsPost";

function PostList() {
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  const [loading, setLoading] = useState(true);

  // APIでpostsを取得する処理をuseEffectで実行します。
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch("https://gmai54xndr.microcms.io/api/v1/posts", {
        headers: {
          "X-MICROCMS-API-KEY": process.env
          .NEXT_PUBLIC_MICRO_CMS_API_KEY as string,
        },
      });
      const { contents } = await res.json();
      setPosts(contents);
      setLoading(false);
    };

    fetcher();
  }, []);

  if (loading) {
    return <p className="py-6 px-4 text-xl">読み込み中</p>;
  }

  if (posts.length === 0) {
    return <p className="py-6 px-4 text-xl">記事が見つかりませんでした</p>;
  }

  return (
    <>
      <div className="px-6 py-2">
        <h2 className="text-2xl font-bold my-6">記事一覧</h2>

        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`}>
            <div className="flex border-b border-gray-300 pb-6 mb-6">
              <Image
                src={post.thumbnail.url}
                width={256}
                height={160}
                alt={`${post.title}のサムネイル`}
                className="w-64 h-40 object-cover shrink-0"
              />
              <div className="ml-6 flex-1">
                <div className="flex items-center gap-3 mb-2">
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
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <div
                  className="line-clamp-2 text-gray-600 text-xl"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default PostList;
