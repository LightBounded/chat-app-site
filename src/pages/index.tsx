import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Chat Room">
      <div className="flex max-h-screen">
        <div className="flex-[1]"></div>
        <div className="flex flex-[5] flex-col py-6 px-4">
          {/* Messages */}
          <div className="flex-1 overflow-y-scroll">
            {[...Array(40)].map((_, i) => (
              <div key={i}>Hello</div>
            ))}
          </div>
          <form className="">
            <input
              className="mt-4 w-full rounded bg-gray-800 py-3 px-4"
              type="text"
              placeholder="Message"
            />
          </form>
        </div>
        <div className="flex-1 bg-gray-900"></div>
      </div>
    </Layout>
  );
}
