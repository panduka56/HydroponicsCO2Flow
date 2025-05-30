import { FaSeedling as Sprout, FaEnvelope as Mail, FaGithub as Github, FaTwitter as Twitter, FaLeaf as Leaf } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="mt-20 neu-inset border-t-2 border-neu-medium">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 neu-raised rounded-xl flex items-center justify-center white-accent-border">
                <Sprout className="text-neu-white text-xl" />
              </div>
              <div>
                <p className="font-bold text-xl text-neu-darkest">CO₂ Flow Estimator</p>
                <p className="text-sm text-neu-medium-dark">Professional Hydroponics Tools</p>
              </div>
            </div>
            <p className="text-neu-medium-dark mb-4 max-w-md">
              Helping growers optimize their CO₂ supplementation for maximum yield and efficiency. 
              Built by growers, for growers.
            </p>
            <div className="flex space-x-4">
              <a href="mailto:info@co2forplants.co.uk" className="neu-button p-2 rounded-xl white-accent-border">
                <Mail className="h-5 w-5 text-neu-white" />
              </a>
              <a href="#" className="neu-button p-2 rounded-xl white-accent-border">
                <Twitter className="h-5 w-5 text-neu-white" />
              </a>
              <a href="#" className="neu-button p-2 rounded-xl white-accent-border">
                <Github className="h-5 w-5 text-neu-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-neu-darkest mb-4 flex items-center">
              <Leaf className="mr-2 h-4 w-4" />
              Resources
            </h3>
            <ul className="space-y-2">
              <li><a href="/guide" className="text-neu-medium-dark hover:text-neu-dark transition-colors">Growing Guide</a></li>
              <li><a href="/safety" className="text-neu-medium-dark hover:text-neu-dark transition-colors">Safety Guidelines</a></li>
              <li><a href="/faq" className="text-neu-medium-dark hover:text-neu-dark transition-colors">FAQ</a></li>
              <li><a href="#" className="text-neu-medium-dark hover:text-neu-dark transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-neu-darkest mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neu-medium-dark hover:text-neu-dark transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-neu-medium-dark hover:text-neu-dark transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-neu-medium-dark hover:text-neu-dark transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neu-medium text-center">
          <p className="text-sm text-neu-medium-dark">
            © 2025 co2forplants.co.uk. All rights reserved. Made with 💚 for the growing community.
          </p>
        </div>
      </div>
    </footer>
  );
}