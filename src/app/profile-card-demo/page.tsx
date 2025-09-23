
import { ProfileCard } from '@/components/profile-card';

export default function ProfileCardDemoPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <ProfileCard
            name="Sophie Bennett"
            imageUrl="https://picsum.photos/seed/sophie/600/800"
            imageHint="woman portrait"
            description="A Product Designer focused on intuitive user experiences."
            followers={312}
            posts={48}
        />
        <ProfileCard
            name="Sophie Bennett"
            imageUrl="https://picsum.photos/seed/sophie/600/800"
            imageHint="woman portrait"
            description="Product Designer who focuses on simplicity & usability."
            followers={312}
            posts={48}
            verified
            darkerButton
        />
      </div>
    </div>
  );
}
