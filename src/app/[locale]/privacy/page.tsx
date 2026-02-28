"use client";

import { useTranslations, useLocale } from "next-intl";

export default function PrivacyPage() {
    const locale = useLocale();

    const content = locale === "zh" ? {
        title: "隐私政策",
        lastUpdated: "最后更新：2024年12月",
        sections: [
            {
                title: "信息收集",
                content: "我们收集您主动提供的信息，包括但不限于：姓名、邮箱地址、联系方式等。我们也可能自动收集某些技术信息，如IP地址、浏览器类型、访问时间等，以改善我们的服务。"
            },
            {
                title: "信息使用",
                content: "我们使用收集的信息来：提供和改进我们的服务；响应您的咨询和请求；发送服务相关通知；进行数据分析以优化用户体验。"
            },
            {
                title: "数据安全",
                content: "我们采取合理的技术和组织措施保护您的个人信息，防止未经授权的访问、使用或披露。我们的私有化部署方案确保您的数据完全由您掌控。"
            },
            {
                title: "第三方服务",
                content: "我们可能使用第三方服务来协助运营我们的业务。这些第三方仅在必要时访问您的信息，并有义务保护您的隐私。"
            },
            {
                title: "Cookie 使用",
                content: "我们使用 Cookie 和类似技术来提升您的浏览体验、分析网站流量并个性化内容。您可以通过浏览器设置管理 Cookie 偏好。"
            },
            {
                title: "您的权利",
                content: "您有权访问、更正或删除您的个人信息。如需行使这些权利，请通过我们的联系页面与我们联系。"
            },
            {
                title: "政策更新",
                content: "我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并注明最后更新日期。"
            },
            {
                title: "联系我们",
                content: "如果您对本隐私政策有任何疑问，请通过 contact@arrislink.com 与我们联系。"
            }
        ]
    } : {
        title: "Privacy Policy",
        lastUpdated: "Last Updated: December 2024",
        sections: [
            {
                title: "Information Collection",
                content: "We collect information you provide directly, including but not limited to: name, email address, and contact details. We may also automatically collect certain technical information such as IP address, browser type, and access time to improve our services."
            },
            {
                title: "Use of Information",
                content: "We use the collected information to: provide and improve our services; respond to your inquiries and requests; send service-related notifications; conduct data analysis to optimize user experience."
            },
            {
                title: "Data Security",
                content: "We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, use, or disclosure. Our private deployment solutions ensure your data remains completely under your control."
            },
            {
                title: "Third-Party Services",
                content: "We may use third-party services to assist in operating our business. These third parties only access your information when necessary and are obligated to protect your privacy."
            },
            {
                title: "Cookie Usage",
                content: "We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage your cookie preferences through your browser settings."
            },
            {
                title: "Your Rights",
                content: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our contact page."
            },
            {
                title: "Policy Updates",
                content: "We may update this privacy policy from time to time. Updated policies will be posted on this page with the last updated date."
            },
            {
                title: "Contact Us",
                content: "If you have any questions about this privacy policy, please contact us at contact@arrislink.com."
            }
        ]
    };

    return (
        <div className="pb-24 pt-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">{content.title}</h1>
                    <p className="text-gray-400">{content.lastUpdated}</p>
                </div>

                <div className="space-y-8">
                    {content.sections.map((section, index) => (
                        <div key={index} className="bg-brand-primary/50 rounded-xl p-6 border border-white/5">
                            <h2 className="text-xl font-semibold text-white mb-3">{section.title}</h2>
                            <p className="text-gray-300 leading-relaxed">{section.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
