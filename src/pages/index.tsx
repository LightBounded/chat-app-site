import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Chat Room">
      <div className="flex min-h-screen">
        <div className="flex-[5] flex flex-col py-6 px-4">
          <div>Asd</div>
          <input
            className="mt-auto w-full bg-gray-800 rounded py-3 px-4"
            type="text"
            placeholder="Message"
          />
        </div>
        <div className="flex-1 bg-gray-900"></div>
      </div>
    </Layout>
  );
}
