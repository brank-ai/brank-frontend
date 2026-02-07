## API Documentation

### 1. POST /brand-insight-request

Submit a brand insight request (stores in DB + sends Slack notification)

**Request:**
POST /brand-insight-request
Content-Type: application/json

Body:
{
  "brand_name": "Nike",
  "email": "user@example.com"
}

**Response (201):**
{
  "message": "Brand insight request recorded successfully",
  "request_id": "uuid-here"
}

**Errors:**
- 400: Missing brand_name or email
- 500: Server error

---

### 2. GET /metric/prompts

Get paginated prompts for a brand

**Query Parameters:**
- brand_name (optional): Brand name, case-insensitive, takes precedence over website
- website (optional): Brand website, case-insensitive
- page (optional): Page number, default 1
- per_page (optional): Items per page, default 10, max 100

Note: At least one of brand_name or website is required

**Examples:**
GET /metric/prompts?brand_name=Samsung&page=1&per_page=10
GET /metric/prompts?website=samsung.com&page=2&per_page=20

**Response (200):**
{
  "prompts": [
    {"prompt_id": "uuid", "prompt": "What is the best phone under $500?"},
    {"prompt_id": "uuid", "prompt": "Compare Samsung vs Apple cameras"}
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_items": 45,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}

**Errors:**
- 400: Missing both brand_name and website
- 404: Brand not found
- 500: Server error