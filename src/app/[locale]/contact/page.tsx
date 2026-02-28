"use client";

import { Mail, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ContactFormContent() {
    const t = useTranslations("contact");
    const searchParams = useSearchParams();
    const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [interest, setInterest] = useState('general');

    const interestKeys = [
        'general',
        'contentUpgrade',
        'productize',
        'system',
        'feedback',
        'partnership'
    ];

    const normalizeInterest = (raw: string | null) => {
        if (!raw) return null;
        if (interestKeys.includes(raw)) return raw;
        const legacyMap: Record<string, string> = {
            starPoints: 'contentUpgrade',
            institution: 'productize',
            privateAI: 'system',
            kidStory: 'contentUpgrade',
            bioPrism: 'contentUpgrade',
            smartResume: 'productize',
            smartRead: 'system',
        };
        return legacyMap[raw] || null;
    };

    // Pre-populate subject & interest from URL params (e.g., ?subject=问题反馈&interest=feedback)
    useEffect(() => {
        const subjectParam = searchParams.get('subject');
        const interestParam = searchParams.get('interest');
        const fromParam = searchParams.get('from');

        if (subjectParam) {
            setSubject(subjectParam);
        }

        const normalized = normalizeInterest(interestParam) || normalizeInterest(fromParam);
        if (normalized) setInterest(normalized);
    }, [searchParams]);

    // Collect browser and device metadata
    const collectClientMetadata = async () => {
        const metadata: Record<string, string | number | null> = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages?.join(',') || navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            screenWidth: window.screen.width,
            screenHeight: window.screen.height,
            viewportWidth: window.innerWidth,
            viewportHeight: window.innerHeight,
            colorDepth: window.screen.colorDepth,
            devicePixelRatio: window.devicePixelRatio,
            referrer: document.referrer || null,
            currentUrl: window.location.href,
            platform: navigator.platform || null,
        };

        // Try to get geolocation (requires user permission)
        try {
            if ('geolocation' in navigator) {
                const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        timeout: 5000,
                        maximumAge: 300000, // 5 min cache
                        enableHighAccuracy: false
                    });
                });
                metadata.latitude = position.coords.latitude;
                metadata.longitude = position.coords.longitude;
                metadata.geoAccuracy = position.coords.accuracy;
            }
        } catch {
            // Geolocation denied or unavailable - silent fail
            metadata.latitude = null;
            metadata.longitude = null;
        }

        return metadata;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormState('loading');
        setErrorMessage('');

        const formData = new FormData(e.currentTarget);

        // Collect client metadata
        const clientMetadata = await collectClientMetadata();

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            subject: formData.get('subject') as string,
            interest: formData.get('interest') as string,
            message: formData.get('message') as string,
            metadata: clientMetadata,
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                setFormState('success');
                (e.target as HTMLFormElement).reset();
            } else {
                setFormState('error');
                setErrorMessage(result.error || 'Something went wrong');
            }
        } catch {
            setFormState('error');
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <div className="pb-24 pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-6">{t("title")}</h1>
                        <p className="text-xl text-gray-400 mb-8">
                            {t("subtitle")}
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">{t("email")}</h3>
                                    <p className="text-gray-400">contact@arrislink.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="h-10 w-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="text-white font-medium">{t("office")}</h3>
                                    <p className="text-gray-400">{t("address")}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-brand-primary p-8 rounded-2xl border border-white/5">
                        {formState === 'success' ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">
                                    {t("form.successTitle") || "Message Sent!"}
                                </h3>
                                <p className="text-gray-400">
                                    {t("form.successMessage") || "Thank you for contacting us. We'll get back to you soon."}
                                </p>
                                <button
                                    onClick={() => setFormState('idle')}
                                    className="mt-6 text-brand-accent hover:underline"
                                >
                                    {t("form.sendAnother") || "Send another message"}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {formState === 'error' && (
                                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                                        <AlertCircle className="h-5 w-5" />
                                        <span>{errorMessage}</span>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">{t("form.name")}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                                        placeholder={t("form.namePlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">{t("form.email")}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                                        placeholder={t("form.emailPlaceholder")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-2">
                                        {t("form.interest")}
                                    </label>
                                    <select
                                        id="interest"
                                        name="interest"
                                        value={interest}
                                        onChange={(e) => setInterest(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                                    >
                                        {interestKeys.map((key) => (
                                            <option key={key} value={key} className="bg-brand-dark">
                                                {t(`form.interests.${key}`)}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        {t("form.subject")}
                                    </label>
                                    {/* Subject suggestions based on selected interest */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {[0, 1, 2].map((idx) => {
                                            const suggestionKey = `form.subjectSuggestions.${interest}.${idx}`;
                                            const suggestion = t.has(suggestionKey) ? t(suggestionKey) : null;
                                            if (!suggestion) return null;
                                            return (
                                                <button
                                                    key={idx}
                                                    type="button"
                                                    onClick={() => setSubject(suggestion)}
                                                    className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${subject === suggestion
                                                        ? 'bg-brand-accent/20 border-brand-accent text-brand-accent'
                                                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-brand-accent/50 hover:text-gray-300'
                                                        }`}
                                                >
                                                    {suggestion}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                                        placeholder={t("form.subjectHint")}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">{t("form.message")}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors"
                                        placeholder={t("form.messagePlaceholder")}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={formState === 'loading'}
                                    className="w-full bg-brand-accent text-brand-dark font-bold py-3 rounded-lg hover:bg-brand-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {formState === 'loading' ? (
                                        <>
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            {t("form.sending") || "Sending..."}
                                        </>
                                    ) : (
                                        t("form.submit")
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-brand-accent" /></div>}>
            <ContactFormContent />
        </Suspense>
    );
}
