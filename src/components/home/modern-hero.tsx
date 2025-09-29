"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, DollarSign, Target, Users } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const stats = [
  { icon: Users, value: "10,000+", label: "Students Empowered" },
  { icon: DollarSign, value: "$2.5M+", label: "Debt Eliminated" },
  { icon: TrendingUp, value: "85%", label: "Success Rate" },
  { icon: Target, value: "3x", label: "Average ROI" },
];

const floatingElements = [
  { id: 1, x: "10%", y: "20%", delay: 0 },
  { id: 2, x: "80%", y: "30%", delay: 0.5 },
  { id: 3, x: "15%", y: "70%", delay: 1 },
  { id: 4, x: "75%", y: "80%", delay: 1.5 },
];

export function ModernHero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1605512930578-a93be1839e4f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw1fHxjaGFydHMlMjBncmFwaHMlMjBmaW5hbmNpYWwlMjBzdWNjZXNzJTIwYnVzaW5lc3N8ZW58MHwwfHxibHVlfDE3NTkxNTY0Nzh8MA&ixlib=rb-4.1.0&q=85')`
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 hero-gradient opacity-90" />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: element.x,
              top: element.y,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 text-center"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Financial Freedom Starts Here</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold mb-6 hero-text-shadow">
            Take <span className="text-gradient">Revenge</span> on
            <br />
            Your <span className="text-gradient">Financial</span> Past
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your relationship with money through actionable education, proven strategies, 
            and a community of like-minded individuals building wealth and eliminating debt.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Button 
            asChild
            size="lg" 
            className="gradient-primary text-white font-semibold px-8 py-4 rounded-full interactive-glow group"
          >
            <Link href="/courses">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          
          <Button 
            asChild
            variant="outline" 
            size="lg"
            className="border-2 border-primary/30 bg-card/50 backdrop-blur-sm font-semibold px-8 py-4 rounded-full interactive-glow"
          >
            <Link href="#success-stories">
              See Success Stories
            </Link>
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center group hover:scale-105 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}