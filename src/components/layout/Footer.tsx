"use client";

import { Twitter, Github } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("footer");
    const locale = useLocale();
    const feedbackHref =
        locale === "zh"
            ? "/contact?interest=feedback&subject=%E7%BD%91%E7%AB%99%E9%97%AE%E9%A2%98"
            : "/contact?interest=feedback&subject=Website%20issue";

    return (
        <footer className="bg-brand-primary border-t border-white/5 text-gray-400">
            <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10">
                                <Image src="/logo-icon.png" alt="Logo" fill sizes="40px" className="object-contain" />
                            </div>
                            <h3 className="text-white text-xl font-bold">{locale === "zh" ? "微棱信息" : "Arrislink"}</h3>
                        </div>
                        <p className="text-sm leading-relaxed">
                            {t("description")}
                        </p>
                        <div className="flex space-x-4">
                            {locale === "zh" ? (
                                <>
                                    {/* WeChat Icon */}
                                    <a href="#" className="hover:text-brand-accent transition-colors" title="微信公众号">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.045c.134 0 .242-.11.242-.245 0-.06-.024-.12-.04-.178l-.325-1.233a.492.492 0 01.177-.554c1.528-1.126 2.51-2.792 2.51-4.635 0-3.122-2.78-5.942-7.07-6.107zm-2.14 2.482c.53 0 .963.44.963.982a.972.972 0 01-.963.98.972.972 0 01-.965-.98c0-.542.433-.982.965-.982zm4.281 0c.53 0 .963.44.963.982a.972.972 0 01-.963.98.972.972 0 01-.965-.98c0-.542.433-.982.965-.982z" />
                                        </svg>
                                    </a>
                                    {/* Weibo Icon */}
                                    <a href="#" className="hover:text-brand-accent transition-colors" title="微博">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.739 5.443zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.194.573zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.642 4.318-.341 5.132-2.159.8-1.777-.159-3.664-2.161-4.169zM19.574 8.25c-.401-.067-.676-.321-.736-.719-.047-.375.045-.668.359-.892.629-.45.769-1.131.463-1.783-.298-.634-.955-.947-1.634-.78-.367.09-.65.023-.868-.306-.23-.35-.207-.695.045-1.003.617-.752 1.633-1.038 2.647-.684 1.076.377 1.834 1.311 1.929 2.434.098 1.219-.593 2.391-1.726 2.749-.272.086-.537.125-.477.984h-.002zM16.12 6.51c-.287-.038-.516-.193-.645-.466-.131-.278-.087-.558.092-.791.265-.344.697-.434 1.085-.195.374.23.52.616.39 1.022-.12.374-.411.53-.922.43zm2.854-2.728c-.645-.062-1.188.25-1.475.808-.192.375-.109.722.233.925.372.22.68.092.876-.262.156-.281.409-.396.725-.361.311.036.506.227.576.529.068.292-.003.56-.242.756-.203.166-.264.377-.168.609.1.243.303.355.559.367.412.019.786-.197.986-.563.372-.68.285-1.593-.198-2.146-.36-.413-.9-.62-1.872-.662zM9.927 3.47c3.584-.45 6.644.97 6.972 3.21.328 2.241-2.35 4.442-5.939 4.899-3.59.457-6.653-.975-6.979-3.211-.326-2.241 2.353-4.441 5.946-4.898z" />
                                        </svg>
                                    </a>
                                    {/* Xiaohongshu Icon */}
                                    <a href="#" className="hover:text-brand-accent transition-colors" title="小红书">
                                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-9a.5.5 0 01-.5-.5v-8a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v8a.5.5 0 01-.5.5zm-7-7v6h2v-2.5h1.5a1.5 1.5 0 000-3H9.5v-.5zm2 2h1.5v1h-1.5v-1zm3-2v6h2v-6h-2z" />
                                        </svg>
                                    </a>
                                </>
                            ) : (
                                <>
                                    <a href="#" className="hover:text-brand-accent transition-colors"><Twitter className="h-5 w-5" /></a>
                                    <a href="#" className="hover:text-brand-accent transition-colors"><Github className="h-5 w-5" /></a>
                                </>
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">{t("solutions")}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/solutions" className="hover:text-brand-accent transition-colors">{t("contentRestructure")}</Link></li>
                            <li><Link href="/solutions" className="hover:text-brand-accent transition-colors">{t("productizeDelivery")}</Link></li>
                            <li><Link href="/solutions" className="hover:text-brand-accent transition-colors">{t("systemLoops")}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">{t("products")}</h4>
                        <div className="text-xs text-gray-500 -mt-4 mb-6">{t("productsHint")}</div>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/products/smart-read" className="hover:text-brand-accent transition-colors">{t("smartRead")}</Link></li>
                            <li><Link href="/products/smart-resume" className="hover:text-brand-accent transition-colors">{t("smartResume")}</Link></li>
                        </ul>
                        <div className="mt-6 text-xs text-gray-500 space-y-2">
                            <div><Link href="/products#showcase" className="hover:text-brand-accent transition-colors">{t("showcaseLink")}</Link></div>
                            <div><Link href="/products#reference" className="hover:text-brand-accent transition-colors">{t("referenceLink")}</Link></div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-6">{t("company")}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/about" className="hover:text-brand-accent transition-colors">{t("aboutUs")}</Link></li>
                            <li><Link href="/case-studies" className="hover:text-brand-accent transition-colors">{t("caseStudies")}</Link></li>
                            <li><Link href="/pricing" className="hover:text-brand-accent transition-colors">{t("pricing")}</Link></li>
                            <li><Link href="/contact" className="hover:text-brand-accent transition-colors">{t("contact")}</Link></li>
                            <li><Link href={feedbackHref} className="hover:text-brand-accent transition-colors">{t("feedback")}</Link></li>
                            <li><Link href="/privacy" className="hover:text-brand-accent transition-colors">{t("privacy")}</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {locale === "zh" ? "北京微棱信息技术有限公司" : "Arrislink Technology Co., Ltd."} {t("copyright")}</p>
                    <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-500 text-xs">
                        <a target="_blank" href="https://beian.miit.gov.cn/" className="hover:text-gray-300 transition-colors">
                            京ICP备18039277号-1
                        </a>
                        <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010502044818" className="flex items-center gap-1 hover:text-gray-300 transition-colors">
                            <Image src="/images/beian.png" alt="公网安备" width={16} height={16} />
                            <span>京公网安备 11010502044818号</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
