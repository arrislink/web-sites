import { auth, signOut } from '@/auth';
import { redirect } from 'next/navigation';
// import { useTranslations } from 'next-intl';

export default async function ProfilePage() {
    // const t = useTranslations('profile');
    const session = await auth();

    if (!session || !session.user) {
        redirect('/login');
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white/5 p-8 rounded-2xl border border-white/10 text-white">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold">User Profile</h2>
                </div>

                <div className="mt-8 space-y-4">
                    <div className="flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={session.user.image || 'https://via.placeholder.com/100'}
                            alt="Avatar"
                            className="h-24 w-24 rounded-full border-2 border-brand-primary"
                        />
                    </div>

                    <div className="border-t border-white/10 pt-4">
                        <p><strong>Name:</strong> {session.user.name}</p>
                        <p><strong>Email:</strong> {session.user.email || 'N/A'}</p>
                        {/* <p><strong>ID:</strong> {session.user.id}</p> */}
                    </div>

                    <form
                        action={async () => {
                            "use server"
                            await signOut({ redirectTo: "/login" });
                        }}
                    >
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Sign Out
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
