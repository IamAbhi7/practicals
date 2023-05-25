#include<bits/stdc++.h>
#include<omp.h>

using namespace std;

class Graph {
    map<int, list<int>> l;
    int x, y;

public:
    void addEdge(int n) {
        for (int i = 0; i < n; i++) {
            cin >> x >> y;
            l[x].push_back(y);
            l[y].push_back(x);
        }
    }

    void dfs_helper(int src, map<int, bool>& visited) {
        cout << src << " ";
        visited[src] = true;

        #pragma omp parallel for
        for (auto nbr : l[src]) {
            if (!visited[nbr]) {
                dfs_helper(nbr, visited);
            }
        }
    }

    void dfs(int src) {
        map<int, bool> visited;
        for (auto p : l) {
            int node = p.first;
            visited[node] = false;
        }
        dfs_helper(src, visited);
    }
};

int main() {
    Graph g;

    int m, i, j, k, src;
    cout << "Enter number of vertices: ";
    cin >> m;
    int n;
    cout << "Enter number of edges: ";
    cin >> n;
    cout << "Edges" << endl;

    g.addEdge(n);

    cout << "Enter initial vertex: ";
    cin >> src;

    g.dfs(src);

    return 0;
}

//In the modified code, OpenMP directives are used to parallelize the for-loop inside the dfs_helper function. 
//The #pragma omp parallel for directive enables multiple threads to execute the loop iterations in parallel, 
//each working on a different neighbor of the current vertex.

