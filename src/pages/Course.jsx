
import React from 'react';
import { useState } from "react"
import {
  BookOpen,
  Calendar,
  Target,
  Users,
  MessageCircle,
  User,
  LogOut,
  Search,
  Play,
  Star,
  Zap,
  Lightbulb,
  Trophy,
  Rocket,
  Brain,
} from "lucide-react"
import "../../src/App.css"
import { Link } from "react-router-dom"

const sidebarItems = [
  { icon: BookOpen, label: "Introduction", active: true },
  { icon: BookOpen, label: "Curriculum" },
  { icon: Calendar, label: "Calendar" },
  { icon: Target, label: "Strategies" },
]

const communityItems = [
  { icon: MessageCircle, label: "Coaching" },
  { icon: Users, label: "Network" },
]

const accountItems = [
  { icon: User, label: "Profile" },
  { icon: LogOut, label: "Logout" },
]

const lessons = [
  { id: 1, title: "Lesson 1", duration: "10 min", icon: Play, description: "Getting started" },
  { id: 2, title: "Lesson 2", duration: "15 min", icon: Star, description: "Basic concepts" },
  { id: 3, title: "Lesson 3", duration: "12 min", icon: Zap, description: "Advanced topics" },
  { id: 4, title: "Lesson 4", duration: "18 min", icon: Lightbulb, description: "Practical examples" },
  { id: 5, title: "Lesson 5", duration: "20 min", icon: Trophy, description: "Best practices" },
  { id: 6, title: "Lesson 6", duration: "14 min", icon: Rocket, description: "Implementation" },
  { id: 7, title: "Lesson 7", duration: "16 min", icon: Brain, description: "Final thoughts" },
]

function Button({ children, variant = "default", size = "default", className = "", onClick }) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

function Input({ type = "text", placeholder, value, onChange, className = "" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    />
  )
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col ">
        {/* Logo */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">CourseOS</h1>
              <p className="text-xs text-gray-400">by Jorge Gonzalez</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-6 ">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MENU</h3>
            <nav className="space-y-1">
              {sidebarItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href="#"
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      item.active
                        ? "bg-orange-500/20 text-orange-400 border-l-2 border-orange-500"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">COMMUNITY</h3>
            <nav className="space-y-1">
              {communityItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">ACCOUNT</h3>
            <nav className="space-y-1">
              {accountItems.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </a>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-t border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto ">
        {/* Hero Section */}
        <div className="relative h-64 bg-gradient-to-r from-orange-600 via-red-500 to-yellow-500 flex items-center justify-center ">
          <div className="text-center z-10  border-b border-gray-700">
            <h1 className="text-5xl font-bold mb-4 ">CourseOS</h1>
            <p className="text-lg max-w-2xl mx-auto px-4">
              The Course Operating System is a Template that lets you host your online course directly in Framer and
              connect it with Gumroad.
            </p>
          </div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Course Content */}
        <div className="p-8 ">
          {/* Modular Section Header */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-700 ">
            <h2 className="text-2xl font-bold ">Modular</h2>
            <span className="text-sm text-gray-400  ">7 LESSONS</span>
          </div>

          {/* Introduction */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Introduction</h3>
            <p className="text-gray-400 text-sm mb-6">Why I designed this course</p>

            {/* First 3 lessons */}
            <div className="space-y-4 mb-8">
              {lessons.slice(0, 3).map((lesson) => {
                const IconComponent = lesson.icon
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-400">{lesson.duration}</p>
                      </div>
                    </div>
                    <Link to='/two'>
                    <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                      Start
                    </Button></Link>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Foundation */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-2">Foundation</h3>
            <p className="text-gray-400 text-sm mb-6">Learn the basics that will set up the long run</p>

            {/* Remaining lessons */}
            <div className="space-y-4">
              {lessons.slice(3).map((lesson) => {
                const IconComponent = lesson.icon
                return (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <p className="text-sm text-gray-400">{lesson.duration}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-700">
                      Start
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
