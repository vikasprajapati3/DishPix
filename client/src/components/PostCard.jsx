import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faComment
} from "@fortawesome/free-solid-svg-icons";

export default function PostCard({ post }) {
    return (
        <div className="bg-(--card) p-4 mt-4 rounded-lg">

            {/* Post Header */}
            <div className="flex justify-between items-center">

                <div>
                    <h2 className="font-bold">
                        {post.user}
                    </h2>

                    <p className="text-(--muted)">
                        {post.restaurant}
                    </p>
                </div>


            </div>

            {/* Post Image */}
            <img
                src={post.image}
                alt={post.restaurant}
                className="w-full mt-3 rounded-lg"
            />

            {/* Actions */}
            <div className="flex items-center gap-5 mt-3">

                <button className="flex items-center gap-2 text-red-500">
                    <FontAwesomeIcon icon={faHeart} />
                    <span>{post.likes}</span>
                </button>

                <button className="flex items-center gap-2 text-(--muted)">
                    <FontAwesomeIcon icon={faComment} />
                    <span>{post.comments}</span>
                </button>

            </div>

            {/* Caption */}
            <p className="mt-2">
                {post.caption}
            </p>

        </div>
    );
}
