import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const handler = async (req: Request) => {
  const { path } = await req.json();

  if (!path) {
    return new Response(JSON.stringify({ message: 'Image path is required' }), {
      status: 400,
    });
  }

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: 'scale' }],
    };

    const result = await cloudinary.uploader.upload(path, options);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (err) {
    return new Response(
      JSON.stringify({ message: 'Failed to upload image on Cloudinary' }),
      { status: 500 }
    );
  }
};

export { handler as POST };
