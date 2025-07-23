const users = [
  {
    id: '1',
    name: 'Alex Chen',
    email: 'alex@example.com',
    bio: 'Passionate storyteller exploring the intersection of technology and humanity.',
    location: 'San Francisco, CA',
    website: 'alexchen.blog',
    joinDate: '2024-01-15',
    followers: 456,
    following: 123
  },
  {
    id: '2',
    name: 'Emma Rodriguez',
    email: 'emma@example.com',
    bio: 'Science fiction writer and dreamer of impossible worlds.',
    location: 'New York, NY',
    joinDate: '2023-11-20',
    followers: 1247,
    following: 89
  },
  {
    id: '3',
    name: 'Sarah Mitchell',
    email: 'sarah@example.com',
    bio: 'Poetry enthusiast and lover of beautiful words.',
    location: 'London, UK',
    joinDate: '2024-02-10',
    followers: 892,
    following: 234
  }
];

const stories = [
  {
    id: '1',
    title: "The Last Library",
    content: `In a world where books are forbidden, Maya discovers the last remaining library hidden beneath the city.

The metal stairs creaked under Maya's feet as she descended into the darkness. The air grew cooler with each step, carrying with it the unmistakable scent of old paper and leather bindings—a smell that had been outlawed for over a decade.

Her flashlight beam danced across the walls, revealing row after row of books stretching into the shadows. Thousands of them, maybe tens of thousands, all preserved in this underground sanctuary while the world above had forgotten the magic of the written word.

"Impossible," she whispered, her voice echoing in the vast space.

Maya had grown up in the Digital Age, where all information was streamed directly to neural implants. Books were considered primitive, inefficient, and most dangerously, uncontrollable. The government couldn't monitor what people thought when they read physical books, couldn't track their interests, couldn't influence their dreams.

But here, in this hidden library, the old world lived on.`,
    excerpt: "In a world where books are forbidden, Maya discovers the last remaining library hidden beneath the city...",
    author: users[1],
    category: 'Sci-Fi',
    tags: ['dystopian', 'books', 'resistance', 'hope'],
    publishDate: '2024-03-10',
    status: 'published',
    likes: 2847,
    comments: 156,
    views: 12450,
    readTime: 8,
    image: "https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: '2',
    title: "The Digital Nomad's Journey",
    content: `A tale of self-discovery through remote work and travel across continents.

The notification chimed softly on my laptop as I sat in a café overlooking the Mediterranean. Another client project completed, another small victory in my journey as a digital nomad. But as I closed my laptop and gazed out at the azure waters, I realized that this journey had become about so much more than work.

Three years ago, I was trapped in a cubicle, watching the same gray walls day after day. The idea of working from anywhere seemed like a distant dream, something only other people could achieve. But here I was, having just finished a project while sitting in a Greek island café, the warm breeze carrying the scent of olive trees and sea salt.

The transformation hadn't been easy. Learning to work independently, managing clients across time zones, dealing with unreliable internet in remote locations – each challenge had taught me something new about resilience and adaptability.`,
    excerpt: "A tale of self-discovery through remote work and travel across continents...",
    author: users[0],
    category: 'Non-Fiction',
    tags: ['travel', 'work', 'lifestyle', 'freedom'],
    publishDate: '2024-02-15',
    status: 'published',
    likes: 3420,
    comments: 89,
    views: 8930,
    readTime: 15,
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400"
  },
  {
    id: '3',
    title: "Midnight Reflections",
    content: `Thoughts that come alive in the quiet hours of the night.

The clock strikes midnight, and the world grows quiet. In these precious hours, when the chaos of the day finally settles, my mind begins to wander through the corridors of memory and imagination.

There's something magical about the night that daylight cannot capture. Perhaps it's the way shadows dance on the walls, creating stories of their own. Or maybe it's the silence that allows our inner voice to finally be heard above the noise of daily life.

Tonight, I find myself thinking about the paths not taken, the words left unspoken, the dreams that still flicker like candles in the darkness. Each thought is a thread in the tapestry of who I am, who I was, and who I might yet become.`,
    excerpt: "Thoughts that come alive in the quiet hours of the night...",
    author: users[0],
    category: 'Poetry',
    tags: ['night', 'reflection', 'thoughts', 'solitude'],
    publishDate: '2024-02-10',
    status: 'published',
    likes: 1890,
    comments: 67,
    views: 5670,
    readTime: 6,
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

const comments = [
  {
    id: '1',
    content: "This story gave me chills! The parallels to our current digital age are striking. Beautiful writing.",
    author: users[0],
    storyId: '1',
    createdAt: '2024-03-11T10:30:00Z',
    likes: 23
  },
  {
    id: '2',
    content: "I love how you've captured the essence of what makes books special. The underground library concept is brilliant!",
    author: users[2],
    storyId: '1',
    createdAt: '2024-03-11T14:15:00Z',
    likes: 18
  }
];

const discussions = [
  {
    id: '1',
    title: "What's your writing routine?",
    content: "I'm curious about how other writers structure their day. Do you write at specific times?",
    author: users[2],
    category: 'Writing Tips',
    replies: 47,
    likes: 23,
    lastActivity: '2 hours ago'
  },
  {
    id: '2',
    title: "Feedback on my latest short story",
    content: "I just finished a new piece and would love some constructive feedback from the community.",
    author: users[0],
    category: 'Feedback',
    replies: 12,
    likes: 8,
    lastActivity: '4 hours ago'
  }
];

const events = [
  {
    id: '1',
    title: "Weekly Writing Challenge: Time Travel",
    description: "Write a short story involving time travel in any genre",
    date: "2024-03-15",
    time: "7:00 PM EST",
    participants: 234,
    type: "Challenge"
  },
  {
    id: '2',
    title: "Author Spotlight: Indie Publishing",
    description: "Learn about self-publishing from successful indie authors",
    date: "2024-03-18",
    time: "6:00 PM EST",
    participants: 156,
    type: "Workshop"
  }
];

const groups = [
  {
    id: '1',
    name: "Sci-Fi Writers Circle",
    description: "A community for science fiction writers to share ideas and get feedback",
    members: 1247,
    image: "https://images.pexels.com/photos/2156/sky-earth-space-working.jpg?auto=compress&cs=tinysrgb&w=100"
  },
  {
    id: '2',
    name: "Poetry Corner",
    description: "Share your poems and discover beautiful verses from fellow poets",
    members: 892,
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=100"
  }
];

const achievements = [
  {
    id: '1',
    title: "First Story",
    description: "Published your first story",
    icon: "🎉",
    date: "Jan 2024",
    unlocked: true
  },
  {
    id: '2',
    title: "Popular Writer",
    description: "Reached 1000 total likes",
    icon: "⭐",
    date: "Feb 2024",
    unlocked: true
  }
];

const activities = [
  {
    id: '1',
    type: 'like',
    user: users[2],
    story: stories[0],
    time: '2 hours ago',
    description: 'liked your story'
  },
  {
    id: '2',
    type: 'comment',
    user: users[1],
    story: stories[1],
    time: '4 hours ago',
    description: 'commented on your story'
  }
];

export const mockData = {
  currentUser: users[0],
  users,
  stories,
  comments,
  discussions,
  events,
  groups,
  achievements,
  activities
};