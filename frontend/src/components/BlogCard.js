import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import Modal from "./Modal";

function BlogCard({ data }) {
  const [like, setLike] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const checkAuthentication = (cb) => {
    if (!user) {
      setIsOpen(true);
    } else {
      cb();
    }
  };

  return (
    <div className="w-full py-8 md:px-12 px-5 flex justify-between items-center overflow-hidden">
      <div className="w-2/3 ml-8">
        <div
          className="cursor-pointer"
          onClick={() => checkAuthentication(() => navigate(data._id))}
        >
          <div className="text-sm font-semibold">
            <Avatar
              name={data.author.username}
              size={20}
              textSizeRatio={2}
              round={true}
              color="green"
              className="mr-2"
            />
            {data.author.username}
          </div>
          <h1 className="text-2xl font-bold my-1">{data.title}</h1>
          <p className="truncate text-gray-500">{data.content}</p>
        </div>
        <div className="w-full flex justify-between items-center mt-1 py-3">
          <div className="flex justify-between items-center text-sm text-gray-500 ">
            <p className="">
              {new Date(data.createdAt).toLocaleString("en-us", {
                month: "short",
                day: "numeric",
              })}
            </p>
            <p className="hover:bg-gray-200 bg-gray-100 p-1 ml-8 rounded-full cursor-pointer">
              {data.category}
            </p>
          </div>
          {like ? (
            <BsHeartFill
              title="Is it helpful?"
              className="text-lg cursor-pointer text-rose-500"
              onClick={() => checkAuthentication(() => setLike(!like))}
            />
          ) : (
            <BsHeart
              title="Is it helpful?"
              className="text-lg cursor-pointer"
              onClick={() => checkAuthentication(() => setLike(!like))}
            />
          )}
        </div>
      </div>
      <div className=" w-52 h-32 mx-6  cursor-pointer aspect-square">
        <div
          className="bg-cyan-500 w-full h-full"
          onClick={() => checkAuthentication(() => navigate(data._id))}
        ></div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </div>
  );
}

export default BlogCard;
