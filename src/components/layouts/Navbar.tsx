'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface NavLink {
  href: string
  label: string
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/donate', label: 'Donate' },
  { href: '/get-involved', label: 'Get Involved' },
  { href: '/contact', label: 'Contact' }
]

const languages = [
  { code: 'EN', label: 'English' },
  { code: 'DE', label: 'Deutsch' },
  { code: 'AR', label: 'العربية' }
]

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('EN')
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false)
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode)
    console.log('Language changed to:', languageCode)
    // TODO: Implement actual language switching logic with next-intl
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 bg-red-600 text-white transition-shadow duration-300 ${
      isScrolled ? 'shadow-lg' : ''
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              {/* You can replace this with an actual logo using next/image */}
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-xl font-bold">NGO Aid</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium hover:text-red-200 transition-colors duration-200 rounded-md hover:bg-red-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-red-700 text-white px-3 py-1 rounded text-sm font-medium border-0 focus:ring-2 focus:ring-white focus:outline-none cursor-pointer"
                aria-label="Select language"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-red-700 text-white">
                    {lang.code}
                  </option>
                ))}
              </select>
            </div>

            {/* Donate Button */}
            <Link
              href="/donate"
              className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors duration-200 shadow-sm"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-red-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
              aria-label="Open main menu"
            >
              {/* Hamburger icon */}
              <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-red-700 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-base font-medium text-white hover:text-red-200 hover:bg-red-600 rounded-md transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          
          {/* Mobile Language Switcher */}
          <div className="px-3 py-2">
            <label htmlFor="mobile-language" className="block text-sm font-medium text-red-200 mb-1">
              Language
            </label>
            <select
              id="mobile-language"
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="bg-red-800 text-white px-3 py-2 rounded text-sm font-medium border-0 focus:ring-2 focus:ring-white focus:outline-none w-full"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-red-800 text-white">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Donate Button */}
          <div className="px-3 py-2">
            <Link
              href="/donate"
              onClick={closeMobileMenu}
              className="block w-full text-center bg-white text-red-600 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-50 transition-colors duration-200 shadow-sm"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}