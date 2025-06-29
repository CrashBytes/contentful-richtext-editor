import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
import { Document } from '@contentful/rich-text-types';

// Sample 1: Blog Post with All Features
export const blogPostSample: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'The Ultimate Guide to Modern Web Development',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Web development has evolved dramatically over the past decade. In this comprehensive guide, we will explore the ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'latest trends',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' and ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'best practices',
          marks: [{ type: MARKS.ITALIC }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' that every developer should know.',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Frontend Technologies',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Modern frontend development revolves around component-based frameworks. Check out React for more information.',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.UL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'React - Component-based UI library',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Vue.js - Progressive framework',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Angular - Full-featured framework with ',
                  marks: [],
                  data: {},
                },
                {
                  nodeType: 'text',
                  value: 'TypeScript',
                  marks: [{ type: MARKS.UNDERLINE }],
                  data: {},
                },
                {
                  nodeType: 'text',
                  value: ' support',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.QUOTE,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'The best framework is the one that helps your team ship faster and maintain code better. Choose based on your team expertise and project requirements.',
              marks: [{ type: MARKS.ITALIC }],
              data: {},
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Backend Technologies',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.OL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Node.js with Express.js',
                  marks: [{ type: MARKS.BOLD }],
                  data: {},
                },
                {
                  nodeType: 'text',
                  value: ' - Fast and lightweight',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Python with Django/FastAPI',
                  marks: [{ type: MARKS.BOLD }],
                  data: {},
                },
                {
                  nodeType: 'text',
                  value: ' - Great for rapid development',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Go with Gin/Echo',
                  marks: [{ type: MARKS.BOLD }],
                  data: {},
                },
                {
                  nodeType: 'text',
                  value: ' - High performance and concurrency',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.HR,
      data: {},
      content: [],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'This guide covers the fundamentals, but web development is constantly evolving. Stay curious and keep learning!',
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

// Sample 2: Simple Marketing Copy
export const marketingCopySample: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Transform Your Business with AI',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Discover how artificial intelligence can ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'revolutionize',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' your workflow and boost productivity by up to ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: '300%',
          marks: [{ type: MARKS.BOLD }, { type: MARKS.UNDERLINE }],
          data: {},
        },
        {
          nodeType: 'text',
          value: '.',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Why Choose Our Platform?',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.UL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Lightning-fast processing',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Enterprise-grade security',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Real-time analytics and insights',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Available in 25+ languages',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.QUOTE,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'This platform saved us 40 hours per week and increased our revenue by 250%. It is a game-changer!',
              marks: [{ type: MARKS.ITALIC }],
              data: {},
            },
          ],
        },
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: '— Sarah Johnson, CEO of TechCorp',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Ready to get started? Sign up for your free trial today and experience the future of business automation.',
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

// Sample 3: Technical Documentation
export const technicalDocSample: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'API Authentication Guide',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'This guide explains how to authenticate with our REST API using ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'Bearer tokens',
          marks: [{ type: MARKS.ITALIC }],
          data: {},
        },
        {
          nodeType: 'text',
          value: '.',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Getting Your API Key',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.OL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Log in to your dashboard',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Navigate to Settings → API Keys',
                  marks: [{ type: MARKS.ITALIC }],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Click "Generate New Key"',
                  marks: [{ type: MARKS.BOLD }],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Copy and securely store your API key',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.QUOTE,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Important: Never expose your API key in client-side code or public repositories. Store it securely on your server.',
              marks: [{ type: MARKS.BOLD }],
              data: {},
            },
          ],
        },
      ],
    },
  ],
};

// Sample 4: Recipe/Tutorial Content
export const recipeSample: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_1,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Perfect Chocolate Chip Cookies',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'These ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'crispy on the outside, chewy on the inside',
          marks: [{ type: MARKS.ITALIC }],
          data: {},
        },
        {
          nodeType: 'text',
          value: ' chocolate chip cookies are the ',
          marks: [],
          data: {},
        },
        {
          nodeType: 'text',
          value: 'ultimate comfort food',
          marks: [{ type: MARKS.BOLD }],
          data: {},
        },
        {
          nodeType: 'text',
          value: '. Perfect for any occasion!',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Ingredients',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.UL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: '2¼ cups all-purpose flour',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: '1 tsp baking soda',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: '1 tsp salt',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: '1 cup butter, softened',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: '2 cups semi-sweet chocolate chips',
                  marks: [{ type: MARKS.BOLD }],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.HEADING_2,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Instructions',
          marks: [],
          data: {},
        },
      ],
    },
    {
      nodeType: BLOCKS.OL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Preheat oven to 375°F (190°C).',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'In a medium bowl, whisk together flour, baking soda, and salt.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'In a large bowl, cream butter and sugars until light and fluffy.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Beat in eggs one at a time, then vanilla extract.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Gradually mix in flour mixture until just combined.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Fold in chocolate chips.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Drop rounded tablespoons of dough onto ungreased baking sheets.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: 'text',
                  value: 'Bake for 9-11 minutes until golden brown around edges.',
                  marks: [],
                  data: {},
                },
              ],
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.QUOTE,
      data: {},
      content: [
        {
          nodeType: BLOCKS.PARAGRAPH,
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Pro Tip: For extra chewy cookies, slightly underbake them. They will continue cooking on the hot baking sheet!',
              marks: [{ type: MARKS.ITALIC }],
              data: {},
            },
          ],
        },
      ],
    },
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: 'text',
          value: 'Makes about 48 cookies. Store in airtight container for up to 1 week. Enjoy!',
          marks: [],
          data: {},
        },
      ],
    },
  ],
};

// Export all samples
export const testDataSamples = {
  blogPost: blogPostSample,
  marketingCopy: marketingCopySample,
  technicalDoc: technicalDocSample,
  recipe: recipeSample,
};