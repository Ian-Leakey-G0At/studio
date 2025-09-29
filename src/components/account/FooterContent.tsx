"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const footerLinks = {
  courses: [
    { href: "/courses", label: "All Courses" },
    { href: "/courses?category=investing", label: "Investing" },
    { href: "/courses?category=debt", label: "Debt Management" },
    { href: "/courses?category=budgeting", label: "Budgeting" },
  ],
  company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
  support: [
    { href: "/help", label: "Help Center" },
    { href: "/faq", label: "FAQ" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Blog" },
  ],
};

export function FooterContent() {
  return (
    <div className="space-y-6">
      {/* Company Info */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-xl text-gradient">
            Revenge Money Academy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            Empowering individuals to take control of their financial destiny through 
            actionable education, proven strategies, and community support.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>hello@revengemoneyacademy.com</span>
          </div>
        </CardContent>
      </Card>

      {/* Links Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Courses */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg">Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {footerLinks.courses.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Company */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg">Company</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle className="text-lg">Support</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <Card className="premium-card">
        <CardHeader>
          <CardTitle className="text-lg">Our Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gradient mb-1">10,000+</div>
              <div className="text-sm text-muted-foreground">Students</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient mb-1">$2.5M+</div>
              <div className="text-sm text-muted-foreground">Debt Eliminated</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient mb-1">85%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gradient mb-1">50+</div>
              <div className="text-sm text-muted-foreground">Expert Courses</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal */}
      <Card className="premium-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div>
              © 2024 Revenge Money Academy. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-primary transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}