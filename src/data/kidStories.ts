export interface StoryPage {
    title: { zh: string; en: string };
    content: { zh: string; en: string };
    image: string;
}

export interface Story {
    id: string;
    title: { zh: string; en: string };
    pages: StoryPage[];
}

export const STORY_DATA: Record<string, Story> = {
    story1: {
        id: "story1",
        title: {
            zh: "太空历险记",
            en: "Space Adventure"
        },
        pages: [
            {
                title: { zh: "出发！", en: "Lift Off!" },
                content: {
                    zh: "小明穿上了爸爸为他缝制的蓝色宇航服，站在后院自制的火箭前。'准备好了吗？'他问他的毛绒熊安迪。倒计时开始了——三，二，一，起飞！",
                    en: "Xiaoming put on the blue spacesuit Dad made for him and stood before the rocket they built in the backyard. \"Ready, Andy?\" he asked his teddy bear. The countdown began—three, two, one, liftoff!"
                },
                image: "/images/stories/story1-page1.png"
            },
            {
                title: { zh: "穿越星河", en: "Through the Stars" },
                content: {
                    zh: "火箭穿过棉花糖般的云层，飞入了闪闪发光的星河。小明透过圆窗望去，地球像一颗蓝色的弹珠渐渐变小。安迪紧紧抱住他的手臂。",
                    en: "The rocket soared through cotton-candy clouds into a glittering galaxy. Through the round window, Xiaoming watched Earth shrink to a tiny blue marble. Andy hugged his arm tight."
                },
                image: "/images/stories/story1-page2.png"
            },
            {
                title: { zh: "新朋友", en: "New Friends" },
                content: {
                    zh: "飞船降落在一颗彩虹色的星球上。一群圆滚滚的小外星人围了上来，好奇地眨着大眼睛。'欢迎！'它们齐声说。小明咧嘴一笑——宇宙可真友好啊！",
                    en: "The ship landed on a rainbow-colored planet. Chubby little aliens gathered around, blinking their big curious eyes. \"Welcome!\" they chimed. Xiaoming grinned—the universe sure was friendly!"
                },
                image: "/images/stories/story1-page3.png"
            },
            {
                title: { zh: "星空奇观", en: "A Galaxy of Wonders" },
                content: {
                    zh: "到处都是绚丽的色彩！小明和外星朋友们一起仰望，星云像魔法颜料一样在他们身边流淌，整个宇宙都在闪闪发光。",
                    en: "Look at all those colors! Xiaoming and his friends watched as nebulae swirled around them like magic paint. The whole universe was sparkling just for them."
                },
                image: "/images/kid-story-gallery-1-v2.png"
            },
            {
                title: { zh: "我的太空故事", en: "My Space Story" },
                content: {
                    zh: "回到地球后，小明迫不及待地展示他新做好的绘本。'我真的去过那里！'他自豪地说。这段回忆变成了他最珍贵的书。",
                    en: "Back on Earth, Xiaoming couldn't wait to show off his new storybook. \"I was really there!\" he said proudly. This memory became his most precious treasure."
                },
                image: "/images/kid-story-case-cn-2.png"
            }
        ]
    },
    story2: {
        id: "story2",
        title: {
            zh: "魔法森林",
            en: "The Magic Forest"
        },
        pages: [
            {
                title: { zh: "追蝴蝶", en: "Chasing Butterflies" },
                content: {
                    zh: "午后的阳光洒进林间，像无数金色的萤火虫。小红追着一只会发光的蓝蝴蝶，一路跑进了从未去过的森林深处。她停下脚步，四周一片寂静。",
                    en: "Afternoon light danced through the trees like golden fireflies. Hong chased a glowing blue butterfly deeper and deeper into woods she'd never seen. She stopped—silence surrounded her."
                },
                image: "/images/stories/story2-page1.png"
            },
            {
                title: { zh: "奇迹发生了", en: "Magic Happens" },
                content: {
                    zh: "忽然，脚边的蘑菇唱起了歌，缠绕的藤蔓自动让开了路。一只萤火虫在前方引路，飞向一片闪着微光的空地。小红屏住呼吸——这是魔法吗？",
                    en: "Suddenly, mushrooms at her feet began to sing. Tangled vines parted on their own. A firefly beckoned her toward a clearing that shimmered softly. Hong held her breath—was this magic?"
                },
                image: "/images/stories/story2-page2.png"
            },
            {
                title: { zh: "森林的礼物", en: "Gift of the Forest" },
                content: {
                    zh: "空地中央，一只巨大的毛茸茸的生物正等着她。它有着像月亮一样温柔的眼睛，轻轻弯下腰，递给小红一朵永不凋谢的花。'这是森林送给勇敢孩子的礼物。'",
                    en: "In the center stood a giant furry creature with eyes as gentle as the moon. It bowed and offered Hong a flower that would never wilt. \"A gift,\" it said, \"for brave children.\""
                },
                image: "/images/stories/story2-page3.png"
            },
            {
                title: { zh: "森林魔法", en: "Forest Magic" },
                content: {
                    zh: "整个森林在魔法的光辉下熠熠生辉。小红觉得这一刻就像一个永远不想醒来的美梦，到处都是奇妙的生命和欢笑。",
                    en: "The entire forest glowed with a soft, magical light. Hong felt like she was in a beautiful dream that she never wanted to end, surrounded by wonderful life and laughter."
                },
                image: "/images/kid-story-gallery-2-v2.png"
            },
            {
                title: { zh: "阅读美好时光", en: "Reading Together" },
                content: {
                    zh: "回到家后，小红和妈妈一起翻阅这本充满魔法的绘本。森林的奇遇不再只是秘密，而成了她们每天晚上共享的温馨时刻。",
                    en: "At home, Hong and her mom read through the magical storybook together. The forest adventure was no longer a secret, but a warm moment they shared every night."
                },
                image: "/images/kid-story-case-cn-1.png"
            }
        ]
    },
    story3: {
        id: "story3",
        title: {
            zh: "月球垂钓",
            en: "Fishing on the Moon"
        },
        pages: [
            {
                title: { zh: "通往月亮的梯子", en: "Ladder to the Moon" },
                content: {
                    zh: "夜深了，整座城市都睡着了。豆豆悄悄打开窗户，架起一架用星星编织的梯子，一级一级地爬向那弯弯的月亮。月亮姐姐正在等他呢。",
                    en: "The city slept under a blanket of stars. Doudou quietly opened his window and climbed a ladder woven from starlight, up and up toward the crescent moon. Sister Moon was waiting."
                },
                image: "/images/stories/story3-page1.png"
            },
            {
                title: { zh: "云海鱼塘", en: "The Cloud-Sea Fishpond" },
                content: {
                    zh: "豆豆坐在月亮的尖尖上，甩出了他的小鱼竿。鱼钩沉入了软绵绵的云海里。这里没有鱼，只有一闪一闪的星星像小鱼儿一样游来游去。",
                    en: "Doudou sat on the moon's tip and cast his tiny fishing rod. The hook sank into the fluffy cloud-sea below. No fish here—just twinkling stars swimming like little fish."
                },
                image: "/images/stories/story3-page2.png"
            },
            {
                title: { zh: "最亮的礼物", en: "The Brightest Gift" },
                content: {
                    zh: "突然，鱼竿一沉！豆豆使劲一拉，钓上来了一颗最亮最亮的星星。他小心翼翼地把它装进玻璃瓶里——这是给怕黑的妹妹最好的夜灯。",
                    en: "Suddenly, a tug! Doudou pulled hard and reeled in the brightest star of all. He placed it gently in a glass jar—the perfect nightlight for his little sister who feared the dark."
                },
                image: "/images/stories/story3-page3.png"
            },
            {
                title: { zh: "月光收获", en: "Moonlight Catch" },
                content: {
                    zh: "豆豆的小桶里装满了闪闪发光的“月亮星”。每一颗星星都代表着一个不同的梦，正等待着被讲给那些爱听故事的人。",
                    en: "Doudou's bucket was full of sparkling moon-stars. Each one held a different dream, waiting to be told to those who love a good story."
                },
                image: "/images/kid-story-gallery-3-v2.png"
            },
            {
                title: { zh: "最好的睡前故事", en: "The Best Bedtime Story" },
                content: {
                    zh: "月球垂钓的故事成了豆豆最爱的绘本。现在他再也不怕黑了，因为他拥有了属于自己的星星，照亮每一个夜晚。",
                    en: "The moon-fishing adventure became Doudou's favorite book. Now, he's never afraid of the dark, because he has his own stars to light up every night."
                },
                image: "/images/kids-book.png"
            }
        ]
    },
    story4: {
        id: "story4",
        title: {
            zh: "怪兽朋友",
            en: "Monster Friends"
        },
        pages: [
            {
                title: { zh: "床下的秘密", en: "Secret Under the Bed" },
                content: {
                    zh: "'咔嚓，咔嚓。'果果听到床底下传来奇怪的声音。他深吸一口气，鼓起全部的勇气，拿着手电筒慢慢地往床下照去……",
                    en: "\"Crunch, crunch.\" Guoguo heard strange sounds from under his bed. He took a deep breath, gathered all his courage, and slowly shone his flashlight underneath…"
                },
                image: "/images/stories/story4-page1.png"
            },
            {
                title: { zh: "害羞的小怪兽", en: "The Shy Monster" },
                content: {
                    zh: "原来是一只蓝色的小怪兽！它正偷偷地吃着果果藏在床底的饼干。小怪兽看到果果，害羞地用毛茸茸的爪子捂住眼睛，把最后一块饼干递了过来。",
                    en: "It was a little blue monster! It had been secretly eating the cookies Guoguo hid under the bed. Seeing him, the monster shyly covered its eyes with fuzzy paws and offered the last cookie."
                },
                image: "/images/stories/story4-page2.png"
            },
            {
                title: { zh: "枕头城堡", en: "Pillow Castle" },
                content: {
                    zh: "那天晚上，他们用所有的枕头和毯子搭了一座城堡，一起躲在里面讲故事。果果发现，原来怪兽一点也不可怕——它只是也想交个朋友。",
                    en: "That night, they built a castle from every pillow and blanket, hiding inside to share stories. Guoguo learned that monsters aren't scary at all—they just want a friend too."
                },
                image: "/images/stories/story4-page3.png"
            },
            {
                title: { zh: "怪兽乐园", en: "Monster Fun" },
                content: {
                    zh: "这些小怪兽一点也不可怕，它们是最好的玩伴！果果在神秘的世界里度过了最快乐的时光，发现了友谊的真谛。",
                    en: "The monsters weren't scary at all—they were the best playmates! Guoguo had the most fun in this secret world and discovered the true meaning of friendship."
                },
                image: "/images/kid-story-gallery-4-v2.png"
            },
            {
                title: { zh: "永远的好朋友", en: "Friends Forever" },
                content: {
                    zh: "果果明白了一个道理：在最意想不到的地方也能找到新朋友。他的 AI 绘本让这份奇妙的友谊永远鲜活地留在心中。",
                    en: "Guoguo realized that a new friend can be found in the most surprising places. His AI storybook keeps this wonderful friendship alive in his heart forever."
                },
                image: "/images/kid-story-hero-zh.png"
            }
        ]
    }
};

export type StoryId = keyof typeof STORY_DATA;
