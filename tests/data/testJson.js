const testCases = [
    {
        name: 'cpp : hello world',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    cout << "hello world";\n' +
                'return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : print stdin',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n\n' +
                'using namespace std;\n' +
                'int main(){\n\n' +
                '    int a;\n' +
                '    while(cin >> a){\n' +
                '        cout << a << endl;\n' +
                '    }\n' +
                '    return 0;\n\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },

    },
    {
        name: 'nodejs : hello world',
        reqObject: {
            language: 'nodejs',
            script: 'console.log(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'nodejs : print stdin',
        reqObject: {
            language: 'nodejs',
            script:
                'process.stdin.setEncoding(\'utf8\'); \n ' +
                'process.stdin.on(\'data\', (input) => { \n ' +
                '  console.log(input); \n ' +
                ' \n ' +
                '}); \n ',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : hello world',
        reqObject: {
            language: 'python',
            script: 'print(\'hello world\')',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : print stdin',
        reqObject: {
            language: 'python',
            script:
                'try:\n' +
                '    while(True):\n' +
                '        line = input()\n' +
                '        if not line:\n' +
                '            break\n' +
                '        print(line)\n' +
                'except EOFError:\n' +
                '    pass',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1 2 3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : hello world',
        reqObject: {
            language: 'c',
            script:
                '#include<stdio.h>\n\n' +
                'int main(){\n\n' +
                '    printf("hello world");\n' +
                '    return 0;\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'c : print stdin',
        reqObject: {
            language: 'c',
            script:
                '#include <stdio.h>\n' +
                'int main() {\n' +
                '    int number;\n' +
                '    while (scanf("%d", &number) == 1) {\n' +
                '        printf("%d\\n", number);\n' +
                '    } \n' +
                '    return 0;\n' +
                '}',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("hello world");\n' +
                '    }\n' +
                '}\n',
        },
        expectedResponse: {
            val: 'hello world\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'java : print stdin',
        reqObject: {
            language: 'java',
            script:
                'import java.util.Scanner;\n' +
                'public class Solution {\n' +
                '    public static void main(String[] args) {\n' +
                '        Scanner scanner = new Scanner(System.in);\n' +
                '        while (scanner.hasNextInt()) {\n' +
                '            int number = scanner.nextInt();\n' +
                '            System.out.println(number);\n' +
                '        } \n' +
                '        scanner.close();\n' +
                '    }\n' +
                '}\n',
            stdin: '1 2 3',
        },
        expectedResponse: {
            val: '1\n2\n3\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print hello world',
        reqObject: {
            language: 'ruby',
            script:
                'print "hello world"'
        },
        expectedResponse: {
            val: 'hello world',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'ruby : print stdin',
        reqObject: {
            language: 'ruby',
            script:
                'user_input = gets.chomp\n' +
                'puts user_input',
            stdin: '10\n'
        },
        expectedResponse: {
            val: '10\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'TLE test',
        reqObject: {
            language: 'nodejs',
            script: 'for(let i=0 ; ; ){i++}',
        },
        expectedResponse: {
            val: 'Time limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test',
        reqObject: {
            language: 'python',
            script: 'one_gb_data = bytearray(1000 * 1024 * 1024)',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 2',
        reqObject: {
            language: 'python',
            script:
                'import time\n' +
                'def consume_memory(target_mb, duration_sec):\n' +
                '    float_size = 8\n' +
                '    floats_per_mb = (1024 * 1024) // float_size\n' +
                '    total_floats = target_mb * floats_per_mb\n' +
                '    iterations = int(duration_sec / 0.1)\n' +
                '    floats_per_iteration = total_floats // iterations\n' +
                '    memory_hog = []\n' +
                '    for _ in range(iterations):\n' +
                '        memory_hog.extend([0.0] * floats_per_iteration)\n' +
                '        time.sleep(0.1)\n' +
                'consume_memory(1000, 1)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'MLE test 3',
        reqObject: {
            language: 'python',
            script:
                'a = [100]\n' +
                'for i in a:\n' +
                '    a.append(i)\n',
        },
        expectedResponse: {
            val: 'Memory limit exceeded',
            status: 200,
            error: 1,
        },
    },
    {
        name: 'OPEN AI test promptv1',
        reqObject: {
            language: 'promptv1',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'OPEN AI test promptv2',
        reqObject: {
            language: 'promptv2',
            prompt: 'The question is what is 2 plus 2. The answer given is 4.',
        },
        expectedResponse: {
            val: {},
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : sum of two numbers',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int a, b;\n' +
                '    cin >> a >> b;\n' +
                '    cout << a + b;\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '3 5',
        },
        expectedResponse: {
            val: '8',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : reverse a string',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    string s;\n' +
                '    cin >> s;\n' +
                '    reverse(s.begin(), s.end());\n' +
                '    cout << s;\n' +
                '    return 0;\n' +
                '}\n',
            stdin: 'hello',
        },
        expectedResponse: {
            val: 'olleh',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : factorial of a number',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int factorial(int n) {\n' +
                '    if (n == 0) return 1;\n' +
                '    return n * factorial(n - 1);\n' +
                '}\n' +
                'int main(){\n' +
                '    int n;\n' +
                '    cin >> n;\n' +
                '    cout << factorial(n);\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '5',
        },
        expectedResponse: {
            val: '120',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : check even or odd',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int n;\n' +
                '    cin >> n;\n' +
                '    if(n % 2 == 0) cout << "even";\n' +
                '    else cout << "odd";\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '7',
        },
        expectedResponse: {
            val: 'odd',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : find maximum of three numbers',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int a, b, c;\n' +
                '    cin >> a >> b >> c;\n' +
                '    cout << max({a, b, c});\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '3 7 5',
        },
        expectedResponse: {
            val: '7',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : sum of array elements',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    int n;\n' +
                '    cin >> n;\n' +
                '    vector<int> arr(n);\n' +
                '    for(int i = 0; i < n; i++) cin >> arr[i];\n' +
                '    int sum = accumulate(arr.begin(), arr.end(), 0);\n' +
                '    cout << sum;\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '5\n1 2 3 4 5',
        },
        expectedResponse: {
            val: '15',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : check prime number',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'bool isPrime(int n) {\n' +
                '    if (n <= 1) return false;\n' +
                '    for (int i = 2; i * i <= n; i++)\n' +
                '        if (n % i == 0) return false;\n' +
                '    return true;\n' +
                '}\n' +
                'int main(){\n' +
                '    int n;\n' +
                '    cin >> n;\n' +
                '    if(isPrime(n)) cout << "prime";\n' +
                '    else cout << "not prime";\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '13',
        },
        expectedResponse: {
            val: 'prime',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : palindrome check',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'bool isPalindrome(string s) {\n' +
                '    int l = 0, r = s.length() - 1;\n' +
                '    while (l < r) {\n' +
                '        if (s[l] != s[r]) return false;\n' +
                '        l++; r--;\n' +
                '    }\n' +
                '    return true;\n' +
                '}\n' +
                'int main(){\n' +
                '    string s;\n' +
                '    cin >> s;\n' +
                '    if(isPalindrome(s)) cout << "yes";\n' +
                '    else cout << "no";\n' +
                '    return 0;\n' +
                '}\n',
            stdin: 'racecar',
        },
        expectedResponse: {
            val: 'yes',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : fibonacci series',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'void fibonacci(int n) {\n' +
                '    int a = 0, b = 1, c;\n' +
                '    for (int i = 0; i < n; i++) {\n' +
                '        cout << a << " ";\n' +
                '        c = a + b;\n' +
                '        a = b;\n' +
                '        b = c;\n' +
                '    }\n' +
                '}\n' +
                'int main(){\n' +
                '    int n;\n' +
                '    cin >> n;\n' +
                '    fibonacci(n);\n' +
                '    return 0;\n' +
                '}\n',
            stdin: '5',
        },
        expectedResponse: {
            val: '0 1 1 2 3 ',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'cpp : count characters in string',
        reqObject: {
            language: 'cpp',
            script:
                '#include<bits/stdc++.h>\n' +
                'using namespace std;\n' +
                'int main(){\n' +
                '    string s;\n' +
                '    cin >> s;\n' +
                '    cout << s.length();\n' +
                '    return 0;\n' +
                '}\n',
            stdin: 'hello',
        },
        expectedResponse: {
            val: '5',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : sum of two numbers',
        reqObject: {
            language: 'python',
            script:
                'a, b = map(int, input().split())\n' +
                'print(a + b)',
            stdin: '3 5',
        },
        expectedResponse: {
            val: '8\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : reverse a string',
        reqObject: {
            language: 'python',
            script:
                's = input()\n' +
                'print(s[::-1])',
            stdin: 'hello',
        },
        expectedResponse: {
            val: 'olleh\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : factorial of a number',
        reqObject: {
            language: 'python',
            script:
                'def factorial(n):\n' +
                '    if n == 0:\n' +
                '        return 1\n' +
                '    return n * factorial(n - 1)\n' +
                'n = int(input())\n' +
                'print(factorial(n))',
            stdin: '5',
        },
        expectedResponse: {
            val: '120\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : check even or odd',
        reqObject: {
            language: 'python',
            script:
                'n = int(input())\n' +
                'if n % 2 == 0:\n' +
                '    print("even")\n' +
                'else:\n' +
                '    print("odd")',
            stdin: '7',
        },
        expectedResponse: {
            val: 'odd\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : find maximum of three numbers',
        reqObject: {
            language: 'python',
            script:
                'a, b, c = map(int, input().split())\n' +
                'print(max(a, b, c))',
            stdin: '3 7 5',
        },
        expectedResponse: {
            val: '7\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : sum of array elements',
        reqObject: {
            language: 'python',
            script:
                'n = int(input())\n' +
                'arr = list(map(int, input().split()))\n' +
                'print(sum(arr))',
            stdin: '5\n1 2 3 4 5',
        },
        expectedResponse: {
            val: '15\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : check prime number',
        reqObject: {
            language: 'python',
            script:
                'def is_prime(n):\n' +
                '    if n <= 1:\n' +
                '        return False\n' +
                '    for i in range(2, int(n**0.5) + 1):\n' +
                '        if n % i == 0:\n' +
                '            return False\n' +
                '    return True\n' +
                'n = int(input())\n' +
                'print("prime" if is_prime(n) else "not prime")',
            stdin: '13',
        },
        expectedResponse: {
            val: 'prime\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : palindrome check',
        reqObject: {
            language: 'python',
            script:
                's = input()\n' +
                'print("yes" if s == s[::-1] else "no")',
            stdin: 'racecar',
        },
        expectedResponse: {
            val: 'yes\n',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : fibonacci series',
        reqObject: {
            language: 'python',
            script:
                'def fibonacci(n):\n' +
                '    a, b = 0, 1\n' +
                '    for _ in range(n):\n' +
                '        print(a, end=" ")\n' +
                '        a, b = b, a + b\n' +
                'n = int(input())\n' +
                'fibonacci(n)',
            stdin: '5',
        },
        expectedResponse: {
            val: '0 1 1 2 3 ',
            status: 200,
            error: 0,
        },
    },
    {
        name: 'python : count characters in string',
        reqObject: {
            language: 'python',
            script:
                's = input()\n' +
                'print(len(s))',
            stdin: 'hello',
        },
        expectedResponse: {
            val: '5\n',
            status: 200,
            error: 0,
        },
    },
]

module.exports = { testCases }
