export default function AllPosts() {
  const text =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English.";
  return (
    <div className="pt-24">
      <section className="w-2/3 m-auto flex flex-col gap-y-6 border border-black rounded">
        <div className="w-11/12 h-1/12 m-auto p-2 border text-black text-sm font-sans">
          {text}
        </div>
      </section>
    </div>
  );
}
