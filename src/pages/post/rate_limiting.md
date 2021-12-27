---
title: "내 트리를 꾸며줘 사태로 보는 DDoS 공격과 api 아키텍쳐 설계 방안"
date: "2021-12-27"
---


나는 중학생이었던 2010년 초부터 트위터를 사용해왔다. 트위터는 단문을 기반으로 한 SNS답게 인터넷 밈이 가장 활발히 발생하고 최신 소식을 빠르게 접할 수 있다는 장점이 있는데, 특히 관심사가 같은 사람들끼리 묶이기 쉽다는 점 때문에 많은 개발자들도 트위터를 이용해 정보를 공유하고 있다.

<br>

트위터에서 많은 사람들이 좋아하고 자주 사용하는 유틸리티 어플리케이션이 있는데, 주로 익명으로 의견을 남기고 답변받는 식의 형태다. 대표적으로 페잉, 푸슝, 에스크, 롤링페이퍼 등이 있으며, 지금 하고자 하는 것은 얼마 전 새로 만들어진 비대면 트리 꾸미기 서비스인 [**내 트리를 꾸며줘**](https://colormytree.me/)에 대한 이야기다.

<br>

처음 이 서비스가 트위터에서 소소하게 인기를 끌었을 때 나는 ‘별 다른 기능이 없는 귀여운 페이지군.’ 하고 넘겼으나, 입소문을 타고 많은 사람들에게 좋게 받아들여진 것 같다. 단기간에 많은 인기를 끌어서인지 이슈가 꽤 발생했는데, 크게 1. 보안 취약점을 이용한 악의적인 공격 피해 2. 인증 없는 가입으로 인한 계정 찾기 불가 3. 유동적인 트래픽 처리로 분류할 수 있겠다. 본인도 사람들에게 즐거움을 주는 유틸리티 서비스를 계획 중인 만큼, 이 이슈들을 통해 서비스 개발 시 주의해야 할 점들을 정리해 보고자 한다.

<br>

<div style="display: flex; justify-content: space-between; align-items: flex-start;">
  <img src="/images/post/attacker_chat_1.png" alt="attacker_discord_chat_1" width="49%">
  <img src="/images/post/attacker_chat_2.png" alt="attacker_discord_chat_2" width="49%">
</div>

<br>

위에서 언급한 이슈 중 깊게 다뤄볼 내용은 1번 보안 취약점을 이용한 악의적인 공격 피해다. 개발 관련 디스코드 커뮤니티에서 보안 취약점을 이용해 (D)DoS 공격을 시도, 이로 인해 서버 성능이 저하되고 과도한 비용이 부과된 사건이다. 여기서 말하는 보안 취약점이란, 사이트 내 api 호출 시 rate limiting이 없는 문제를 의미한다. 쉽게 말해 클라이언트에서 서버를 호출하는 횟수에 제한이 없다는 의미로, 짧은 시간에 많은 서버 트래픽이 발생할 가능성이 있다. 공격자들은 메세지를 생성하는 POST 요청을 단시간에 많이 발생시켰고, 이로 인해 일반 유저들의 사이트 접근이 어려워졌다. 공격자들의 윤리적 문제를 배제하고 사건 자체에 집중해 우선 DDoS가 무엇인지부터 알아보자.

<br>

DDoS/Dos란 (Distrubted) Denial of Service attack의 줄임말로, 직역하면 (분산) 서비스 거부 공격이라고 하며 특정 서버나 네트워크 장비를 대상으로 비정상적인 트래픽을 발생시켜 장애를 일으키는 해킹 기법이다. DDoS는 공격 형태에 따라 크게 1. 대역폭 공격 2. 자원 소진 공격 3. 웹/DB 부하 공격이 있는데, 여기서 발생한 경우는 3. 웹/DB 부하 공격으로 보인다. 웹/DB 공격은 또 1. HTTP Flooding 2. Slowloris Attack 3. RUDY Attack 4. Slow read Attack 등으로 나뉘는데, 이 중 HTTP Flooding이 가장 대표적으로 지금의 케이스에 해당하는 것으로 보인다. 공격자는 TCP protocol의 3-way handshake를 통해 서버와 세션을 맺은 후, HTTP GET 또는 POST 메소드 요청을 통해 웹 서버의 자원을 소진함과 동시에 DB 서버까지 자원을 소진시켜 정상적인 사용자의 웹 서비스 이용을 차단한다. 해당 이슈를 해결하기 위해서 1. 최대 요청 임계치를 설정하거나 2. 클라이언트 요청에 쿠키(토큰) 값을 추가해 응답을 보내도록 설정하는 방법으로 비정상 사용자를 차단하는 방법을 사용할 수 있다.

<br>

결과적으로, Rate Limiting은 과도한 트래픽(DDoS)으로부터 시스템을 보호하는 역할을 한다. 하지만 일반적으로 클라이언트는 모든 요청을 적절하게 처리하는 것이 중요하므로, 서버에서 정한 비율 제한을 잘 준수하는 것이 좋다. 주요 오픈 소스나 서비스는 Rate Limiting을 위한 특정 헤더 키를 제공하고 있으므로 이를 잘 활용하도록 하자. 기존 서비스를 이용하는 경우가 아니라면, 서버 혹은 클라이언트에 적어도 하나 이상의 Rate Limiting을 위한 기법을 구현하는 것이 중요하다.

<br>

```xml
HTTP/1.1 429 Too Many rquests
X-RateLimit-Limit // 시간당 요청 가능 횟수 (IP당 할당)
X-RateLimit-Remaining // 남은 요청 수
X-RateLimit-Reset // 요청 최대값이 재성절될 때까지의 시간
Retry-After // 요청 재시도까지 지연 시킬 시간
```

<br>

HTTP 서비스에서 서비스가 비율 제한을 적용하고 있다고 알리는 가장 일반적인 방법은 HTTP 응답에 429 상태 코드를 반환하는 것이다. 이 응답은 제한이 적용되는 이유에 대한 추가 정보를 제공할 수 있다. 또한, 제한 키로 사용하기에 적합한 요청의 속성을 선택하고 이 키를 사용해 요청을 추적한다. 

<br>

아래는 Rate Limiter를 구현하기 위한 알고리즘이다.

<br>

1. Leaky Bucket
    
    ![leack bucket algorithm](https://miro.medium.com/max/886/1*4zDFgaruIiP1QWP_eGH0Rw.png)
    
    가장 간단히 구현할 수 있는 알고리즘으로, 많은 양의 트래픽이 발생하더라도 특정 속도의 RPS(Response per Second)를 유지하는 방식이다. 여기서 우리는 시간당 처리할 수 있는 요청의 양(rate)과 가지고 있을 수 있는 요청의 양(capacity)을 정의해야 한다. 들어오는 트래픽이 많아 용량을 초과하게 되면 해당 요청은 버린다. 입력 속도가 출력 속도보다 크면 누적이 발생하고, 누적이 버킷 용량보다 큰 경우 오버플로가 발생해 데이터 패킷 손실이 발생할 수 있다. 또한 여러 종류의 트래픽 속도를 지원해야 하는 경우나 네트워크 자원의 여유가 많을 때는 비효율적이다.

<br>

2. Token Bucket
    
    ![token bucket algorithm](https://www.mimul.com/static/53e202f8b985d2acb8fd7081248688ce/fd7a0/rate_leakybucket.png)
    
    버킷을 queue로 사용하지 않고 트래픽을 제어하기 위한 토큰을 관리하는 용도로 사용한다. 트래픽은 토큰 유무에 따라 흐름 제어를 받게 되는데, 트래픽이 용량을 초과하는 경우에도 정해진 한계치 범위 내에서는 통과가 가능하다.
 
<br>

3. Fixed Window Counter
    
    ![fixed window counter algorithm](https://miro.medium.com/max/1400/1*RsIDJCT-RUdqvAeKkFQUyw.png)
    
    정해진 시간 단위로 window를 나누고 각 window에는 카운터가 제공된다. 해당 window의 요청 건수가 카운터보다 크면 해당 요청은 거부된다. 구현하기 쉽고 카운터가 window마다 재설정되기 때문에 최신 요청이 처리될 수 있다. 하지만 카운터 재설정의 오버 헤드가 있고 경계의 시간대에 요청이 오면 2배의 부하를 받게 되는 트래픽 편향 문제가 발생한다.
    
    예를 들어, 시간당 3000개의 요청 제한이 있는 경우, 한 시간의 첫 1분 동안 3000개의 요청이 모두 발생한다면 서비스에 문제가 발생할 수 있다.

<br>

4. Sliding Window Counter
    
    ![sliding window counter algorithm](https://miro.medium.com/max/1156/1*VG-VMYx9_7uvxkhiUgC-4Q.png)
    
    Fixed Window Counter의 단점인 기간 경계의 편향에 대응하기 위한 알고리즘으로, 이전 window 카운터 정보를 사용해  현재 window에 대한 현재 요청 비율의 크기를 추정한다. 많은 곳에서 실제로 사용되는 기법이다.
    

지금까지 어플리케이션 수준에서의 rate limiting 방법에 대해 알아봤다. 추가적으로 다른 기법과 결합해 rate limiting의 탄력성을 향상할 수 있다.

<br>

1. caching
2. circuit breaking
3. prioritization
4. rate limiting at multiple layers
5. monitoring

<br>
<br>

## ○ 참고 문서

<br>

* [서비스 가용성 확보에 필요한 Rate Limiting Algorithm에 대해](https://www.mimul.com/blog/about-rate-limit-algorithm/)

* [고 처리량 분산 비율 제한기](https://engineering.linecorp.com/ko/blog/high-throughput-distributed-rate-limiter/)

* [Designing a Rate Limiter](https://towardsdatascience.com/designing-a-rate-limiter-6351bd8762c6)

* [design a scalable rate limiting algorithm system design](https://medium.com/@NlognTeam/design-a-scalable-rate-limiting-algorithm-system-design-nlogn-895abba44b77)

* [Rate Limiting Algorithm](https://talzuchung-kty.tistory.com/7)

* [Token Bucket 알고리즘](https://wooner2.tistory.com/284)

* [System design 4 - How to design a rate limiter](https://liamchzh.com/tech/2020/11/18/system-design-4/)

* [Rate-limiting strategies and techniques](https://cloud.google.com/architecture/rate-limiting-strategies-techniques#techniques-enforcing-rate-limits)

* [What is a DDoS attack](https://www.cloudflare.com/ko-kr/learning/ddos/what-is-a-ddos-attack/)

* [How to DDoS](https://www.cloudflare.com/ko-kr/learning/ddos/ddos-attack-tools/how-to-ddos/)

* [DDoS(distributed denial-of-service) 공격이란 무엇일까요?](https://www.akamai.com/ko/our-thinking/ddos)

* [bps, pps](https://m.blog.naver.com/PostView.naver?isHttpsRedirect=true&blogId=sdream4&logNo=10085825268)
