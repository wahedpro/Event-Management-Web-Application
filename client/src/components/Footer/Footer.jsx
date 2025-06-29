
const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="container mx-auto px-4 py-5 ">
        {/* Copyright */}
        <div className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} NexusEvents. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;