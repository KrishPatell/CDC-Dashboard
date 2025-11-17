"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending reset email
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-xl">
          <CardContent className="p-8">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 mb-2">Forgot password?</h2>
                  <p className="text-slate-600">
                    No worries, we'll send you reset instructions
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="mb-2 block">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600"
                    size="lg"
                  >
                    Reset password
                  </Button>

                  <Link
                    href="/auth/login"
                    className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-900"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to log in
                  </Link>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your email</h2>
                <p className="text-slate-600 mb-6">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Didn't receive the email? Check your spam folder or{" "}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    try another email
                  </button>
                </p>
                <Link href="/auth/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600" size="lg">
                    Back to log in
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

