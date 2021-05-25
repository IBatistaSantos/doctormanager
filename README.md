<h1 class="code-line" data-line-start=0 data-line-end=1 ><a id="Doctor_Manager_0"></a>Doctor Manager</h1>
<p class="has-line-data" data-line-start="2" data-line-end="3">Doctor manager is a medical record management system</p>
<ul>
<li class="has-line-data" data-line-start="3" data-line-end="4">Typecript</li>
<li class="has-line-data" data-line-start="4" data-line-end="5">TDD</li>
<li class="has-line-data" data-line-start="5" data-line-end="6">Validation Routes</li>
<li class="has-line-data" data-line-start="6" data-line-end="8">Clean Code</li>
</ul>
<h2 class="code-line" data-line-start=8 data-line-end=9 ><a id="Features_8"></a>Features</h2>
<ul>
<li class="has-line-data" data-line-start="10" data-line-end="11">Creation of medical specialties</li>
<li class="has-line-data" data-line-start="11" data-line-end="12">Medical record</li>
<li class="has-line-data" data-line-start="12" data-line-end="13">Updating the medical record</li>
<li class="has-line-data" data-line-start="13" data-line-end="14">Soft Deletion of the medical record</li>
</ul>
<h2 class="code-line" data-line-start=16 data-line-end=17 ><a id="Installation_16"></a>Installation</h2>
<p class="has-line-data" data-line-start="18" data-line-end="19">Docker requires <a href="https://nodejs.org/">Node.js</a> to run and Docker.</p>
<p class="has-line-data" data-line-start="20" data-line-end="21">Install the dependencies and devDependencies and start the server.</p>
<pre><code class="has-line-data" data-line-start="23" data-line-end="26" class="language-sh"><span class="hljs-built_in">cd</span> doctormanager
npm i or yarn
</code></pre>
<h2 class="code-line" data-line-start=27 data-line-end=28 ><a id="Run_Aplication_27"></a>Run Aplication</h2>
<pre><code class="has-line-data" data-line-start="29" data-line-end="33" class="language-sh">docker compose up
yarn typeorm migration:run
yarn seed:specialy
</code></pre>
