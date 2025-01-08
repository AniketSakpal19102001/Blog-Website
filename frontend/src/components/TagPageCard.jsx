import {
  ThumbsUp,
  MessageCircle,
  BookmarkPlus,
  BookmarkCheck,
} from "lucide-react";
function TagPageCard() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <img
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*uVff-K-3MYF2f6SnA0o7vw@2x.jpeg"
          alt=""
          className=" aspect-[7/4]"
        />
        <div className="flex items-center gap-2">
          <div className="bg-gray-300 w-6 aspect-square rounded-full"></div>
          <span>Author name</span>
        </div>
        <p className="font-bold text-xl">
          You don’t always have to wait for the right time
        </p>
        <div className="pt-2 flex justify-between text-sm">
          <div className="flex gap-2 ">
            <span
              title="Like"
              className="flex gap-2 hover:text-black text-gray-700 cursor-pointer"
            >
              <ThumbsUp strokeWidth={0.8} size={18} /> 55
            </span>{" "}
            <span
              title="Comment"
              className="flex gap-2 hover:text-black text-gray-700 cursor-pointer"
            >
              <MessageCircle strokeWidth={0.8} size={18} /> 22
            </span>
          </div>
          <div>
            {false ? (
              <BookmarkCheck strokeWidth={0.8} size={18} />
            ) : (
              <BookmarkPlus strokeWidth={0.8} size={18} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TagPageCard;
