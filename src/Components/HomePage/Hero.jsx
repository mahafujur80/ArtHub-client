import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className=" flex items-center py-5">
      <div className="container mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center rounded-full  px-4 py-2 text-sm font-medium shadow-sm">
              🎨 Original Artworks
            </span>

            <h1 className="mt-6 text-3xl md:text-5xl font-bold leading-tight text-slate-900 ">
              Discover & Buy <br />
              <span className="text-orange-500">
                Original
              </span> Art
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Explore unique, authentic artworks from talented artists
              around the world. Find paintings, illustrations and digital masterpieces.
            </p>

            <Link href="/artworks">
              <button className="mt-8 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90 hover:scale-105">
                Browse Artworks
              </button>
            </Link>

            {/* Features */}
            <div className="mt-14 flex flex-wrap gap-8">
              <div>
                <h4 className="font-semibold">100% Original</h4>
                <p className="text-sm text-slate-500">Authentic artworks</p>
              </div>

              <div>
                <h4 className="font-semibold">Support Artists</h4>
                <p className="text-sm text-slate-500">Empower creativity</p>
              </div>

              <div>
                <h4 className="font-semibold">Secure Payment</h4>
                <p className="text-sm text-slate-500">Safe & protected</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute  h-64 w-64 rounded-full bg-orange-200 blur-3xl opacity-35" />
            
            <div className="relative z-10 w-full max-w-md aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=800&fit=crop"
                alt="Colorful abstract artwork"
                fill
                className="rounded-3xl object-cover shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}